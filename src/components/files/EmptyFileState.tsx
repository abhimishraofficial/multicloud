
import { AlertTriangle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyFileStateProps {
  hasSearchQuery: boolean;
  onUploadClick: () => void;
}

export function EmptyFileState({ hasSearchQuery, onUploadClick }: EmptyFileStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-lg border border-dashed border-muted p-8">
      <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium text-center">No files found</h3>
      <p className="text-muted-foreground mt-1 text-center max-w-md">
        {hasSearchQuery 
          ? "Try a different search term or filter." 
          : "Upload some files to get started with CloudSync."}
      </p>
      {!hasSearchQuery && (
        <Button className="mt-6" onClick={onUploadClick} size="lg">
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      )}
    </div>
  );
}
