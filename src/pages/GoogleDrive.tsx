
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FileExplorer } from "@/components/files/FileExplorer";
import { FileItem } from "@/components/files/types/FileTypes";

export default function GoogleDrive() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample data - in a real app, this would come from an API
        const sampleFiles: FileItem[] = [
          {
            id: "1",
            name: "Project Proposal.docx",
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            size: "2.5 MB",
            source: "google-drive",
            modifiedDate: "2023-10-15T14:48:00.000Z"
          },
          {
            id: "2",
            name: "Budget_2023.xlsx",
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            size: "1.8 MB",
            source: "google-drive",
            modifiedDate: "2023-10-10T09:30:00.000Z"
          },
          {
            id: "3",
            name: "Team Photos",
            type: "folder",
            size: "4 items",
            source: "google-drive",
            modifiedDate: "2023-09-28T16:20:00.000Z"
          },
          {
            id: "6",
            name: "Client Documentation.pdf",
            type: "application/pdf",
            size: "4.7 MB",
            source: "google-drive",
            modifiedDate: "2023-10-05T15:30:00.000Z"
          }
        ];
        
        setFiles(sampleFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFiles();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Google Drive</h1>
          <p className="text-muted-foreground">
            View and manage your Google Drive files
          </p>
        </div>
        
        <FileExplorer files={files} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
}
