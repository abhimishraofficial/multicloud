
import { useState, useEffect } from "react";
import { UploadingFile } from "../FileItem";
import { generateFileId, getHumanReadableSize } from "../utils/fileUtils";
import { useToast } from "@/hooks/use-toast";

export function useFileUpload(onUploadComplete?: () => void) {
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const [destination, setDestination] = useState<'google-drive' | 'onedrive'>('google-drive');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  // Load any in-progress uploads from localStorage on component mount
  useEffect(() => {
    const savedUploads = localStorage.getItem('cloudSync_uploads');
    if (savedUploads) {
      try {
        const parsedUploads = JSON.parse(savedUploads);
        setFiles(parsedUploads);
        
        // Check if there are any files still uploading
        const hasUploadingFiles = parsedUploads.some(
          (file: UploadingFile) => file.status === 'uploading'
        );
        
        setIsUploading(hasUploadingFiles);
      } catch (error) {
        console.error('Failed to parse saved uploads', error);
      }
    }
  }, []);
  
  // Save uploads to localStorage whenever they change
  useEffect(() => {
    if (files.length > 0) {
      localStorage.setItem('cloudSync_uploads', JSON.stringify(files));
    }
  }, [files]);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || isUploading) return;
    
    setIsUploading(true);
    
    // Convert selected files to our UploadingFile format
    const newFiles: UploadingFile[] = Array.from(selectedFiles).map(file => {
      // Create a file URL for preview
      const fileUrl = URL.createObjectURL(file);
      
      return {
        id: generateFileId(),
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'uploading',
        destination: destination,
        type: file.type,
        fileUrl, // Store the URL for display
        file: file // Store the actual file object for upload
      };
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Process uploads for each file
    newFiles.forEach(fileItem => {
      uploadFileToAPI(fileItem);
    });
  };

  const uploadFileToAPI = async (fileItem: UploadingFile) => {
    if (!fileItem.file) return;
    
    const formData = new FormData();
    formData.append('file', fileItem.file);
    formData.append('destination', fileItem.destination);
    
    try {
      // This is where we would actually make the API call
      // For now, we'll simulate with fetch and manual progress updates
      // const response = await fetch('/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // Simulate upload with progress
      await simulateFileUploadWithProgress(fileItem.id);
      
      // Handle success
      setFiles(prev => 
        prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, progress: 100, status: 'completed' } 
            : f
        )
      );
      
      toast({
        title: "Upload complete",
        description: `${fileItem.name} has been uploaded successfully.`,
      });
      
      // Check if all uploads are done
      checkAllUploadsComplete();
      
    } catch (error) {
      console.error('Error uploading file:', error);
      
      // Handle error
      setFiles(prev => 
        prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: 'error' } 
            : f
        )
      );
      
      toast({
        title: "Upload failed",
        description: `Failed to upload ${fileItem.name}. Please try again.`,
        variant: "destructive"
      });
      
      // Check if all uploads are done
      checkAllUploadsComplete();
    }
  };

  const simulateFileUploadWithProgress = (fileId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Simulate random success/failure (90% success rate)
          if (Math.random() > 0.1) {
            resolve();
          } else {
            reject(new Error("Simulated upload failure"));
          }
        } else {
          setFiles(prev => 
            prev.map(f => 
              f.id === fileId ? { ...f, progress: Math.round(progress) } : f
            )
          );
        }
      }, 500);
    });
  };
  
  const checkAllUploadsComplete = () => {
    const allCompleted = files.every(f => 
      f.status === 'completed' || f.status === 'error'
    );
    
    if (allCompleted) {
      setIsUploading(false);
      
      // Save completed uploads to localStorage as files
      const completedFiles = files.filter(f => f.status === 'completed');
      saveCompletedFilesToStorage(completedFiles);
      
      // Call onUploadComplete callback if provided
      if (onUploadComplete && completedFiles.length > 0) {
        onUploadComplete();
      }
    }
  };
  
  const saveCompletedFilesToStorage = (completedFiles: UploadingFile[]) => {
    // Get existing files from storage
    const savedFiles = localStorage.getItem('cloudSync_files') || '[]';
    let existingFiles = [];
    
    try {
      existingFiles = JSON.parse(savedFiles);
    } catch (error) {
      console.error('Failed to parse saved files', error);
    }
    
    // Convert UploadingFile objects to FileItem objects
    const newFileItems = completedFiles.map(file => ({
      id: file.id,
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: getHumanReadableSize(file.size),
      source: file.destination,
      modifiedDate: new Date().toISOString(),
      fileUrl: file.fileUrl
    }));
    
    // Merge files and save back to localStorage
    const updatedFiles = [...existingFiles, ...newFileItems];
    localStorage.setItem('cloudSync_files', JSON.stringify(updatedFiles));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isUploading) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      const updatedFiles = prev.filter(f => f.id !== fileId);
      
      // Update localStorage
      localStorage.setItem('cloudSync_uploads', JSON.stringify(updatedFiles));
      
      // If we're removing the last uploading file, set isUploading to false
      if (fileToRemove?.status === 'uploading') {
        const stillHasUploading = updatedFiles.some(f => f.status === 'uploading');
        if (!stillHasUploading) {
          setIsUploading(false);
        }
      }
      
      return updatedFiles;
    });
  };

  const clearCompletedFiles = () => {
    setFiles(prev => {
      const updatedFiles = prev.filter(file => file.status !== 'completed');
      // Update localStorage
      localStorage.setItem('cloudSync_uploads', JSON.stringify(updatedFiles));
      return updatedFiles;
    });
  };

  return {
    files,
    destination,
    isDragging,
    isUploading,
    setDestination,
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeFile,
    clearCompletedFiles
  };
}
