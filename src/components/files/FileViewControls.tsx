
import { Grid, List, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileViewControlsProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  onUploadClick: () => void;
}

export function FileViewControls({
  viewMode,
  setViewMode,
  onUploadClick
}: FileViewControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="border rounded-md flex">
        <Button 
          variant={viewMode === 'grid' ? 'default' : 'ghost'} 
          size="sm" 
          onClick={() => setViewMode('grid')}
          className="rounded-none rounded-l-md"
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button 
          variant={viewMode === 'list' ? 'default' : 'ghost'} 
          size="sm" 
          onClick={() => setViewMode('list')}
          className="rounded-none rounded-r-md"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
      
      <Button onClick={onUploadClick}>
        <Upload className="h-4 w-4 mr-2" />
        Upload
      </Button>
    </div>
  );
}
