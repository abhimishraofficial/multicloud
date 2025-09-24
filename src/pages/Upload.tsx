
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FileUpload } from "@/components/files/FileUpload";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Upload() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleUploadComplete = () => {
    toast({
      title: "Upload complete",
      description: "All files have been uploaded successfully."
    });
    
    // Navigate back to dashboard after upload is complete
    navigate('/dashboard');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Upload Files</h1>
          <p className="text-muted-foreground">
            Upload files to your connected cloud storage accounts
          </p>
        </div>
        
        <FileUpload onUploadComplete={handleUploadComplete} />
      </div>
    </DashboardLayout>
  );
}
