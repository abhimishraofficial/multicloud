
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileItem } from "./types/FileTypes";
import { FileGrid } from "./FileGrid";
import { FileList } from "./FileList";
import { FileSearch } from "./FileSearch";
import { FileViewControls } from "./FileViewControls";
import { EmptyFileState } from "./EmptyFileState";
import { FileLoadingState } from "./FileLoadingState";
import { DeleteFileDialog } from "./dialogs/DeleteFileDialog";
import { RenameFileDialog } from "./dialogs/RenameFileDialog";
import { useToast } from "@/hooks/use-toast";

interface FileExplorerProps {
  files: FileItem[];
  isLoading?: boolean;
}

export function FileExplorer({ files, isLoading = false }: FileExplorerProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [filterSource, setFilterSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    const file = files.find(f => f.id === id);
    if (file) {
      setSelectedFile(file);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleRename = (id: string, currentName: string) => {
    const file = files.find(f => f.id === id);
    if (file) {
      setSelectedFile(file);
      setIsRenameDialogOpen(true);
    }
  };

  const handleDownload = (id: string) => {
    const file = files.find(f => f.id === id);
    
    if (file && file.fileUrl) {
      const a = document.createElement('a');
      a.href = file.fileUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: "Download started",
        description: `${file.name} will be downloaded shortly`,
      });
    } else {
      toast({
        title: "Download failed",
        description: "This file cannot be downloaded",
        variant: "destructive"
      });
    }
  };

  const confirmDelete = () => {
    if (selectedFile) {
      const savedFiles = localStorage.getItem('cloudSync_files');
      if (savedFiles) {
        try {
          const parsedFiles = JSON.parse(savedFiles);
          const updatedFiles = parsedFiles.filter((f: FileItem) => f.id !== selectedFile.id);
          localStorage.setItem('cloudSync_files', JSON.stringify(updatedFiles));
          
          window.location.reload();
          
          toast({
            title: "File deleted",
            description: `${selectedFile.name} has been deleted.`,
          });
        } catch (error) {
          console.error('Failed to delete file', error);
          toast({
            title: "Error deleting file",
            description: "An error occurred while deleting the file.",
            variant: "destructive"
          });
        }
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const confirmRename = (newFileName: string) => {
    if (selectedFile) {
      const savedFiles = localStorage.getItem('cloudSync_files');
      if (savedFiles) {
        try {
          const parsedFiles = JSON.parse(savedFiles);
          const updatedFiles = parsedFiles.map((f: FileItem) => 
            f.id === selectedFile.id ? { ...f, name: newFileName } : f
          );
          localStorage.setItem('cloudSync_files', JSON.stringify(updatedFiles));
          
          window.location.reload();
          
          toast({
            title: "File renamed",
            description: `File has been renamed to ${newFileName}.`,
          });
        } catch (error) {
          console.error('Failed to rename file', error);
          toast({
            title: "Error renaming file",
            description: "An error occurred while renaming the file.",
            variant: "destructive"
          });
        }
      }
    }
    setIsRenameDialogOpen(false);
  };

  const handleUploadClick = () => {
    navigate('/dashboard/upload');
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = filterSource === 'all' || file.source === filterSource;
    return matchesSearch && matchesSource;
  });

  if (isLoading) {
    return <FileLoadingState />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <FileSearch
          searchQuery={searchQuery}
          filterSource={filterSource}
          setSearchQuery={setSearchQuery}
          setFilterSource={setFilterSource}
        />
        
        <FileViewControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          onUploadClick={handleUploadClick}
        />
      </div>
      
      {filteredFiles.length === 0 ? (
        <EmptyFileState 
          hasSearchQuery={!!searchQuery} 
          onUploadClick={handleUploadClick} 
        />
      ) : (
        viewMode === 'grid' ? (
          <FileGrid 
            files={filteredFiles} 
            onDelete={handleDelete} 
            onDownload={handleDownload} 
            onRename={handleRename}
          />
        ) : (
          <FileList 
            files={filteredFiles} 
            onDelete={handleDelete} 
            onDownload={handleDownload} 
            onRename={handleRename}
          />
        )
      )}
      
      <DeleteFileDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        selectedFile={selectedFile}
        onConfirm={confirmDelete}
      />
      
      <RenameFileDialog
        isOpen={isRenameDialogOpen}
        setIsOpen={setIsRenameDialogOpen}
        selectedFile={selectedFile}
        onConfirm={confirmRename}
      />
    </div>
  );
}
