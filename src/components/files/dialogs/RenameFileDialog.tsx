
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { FileItem } from "../types/FileTypes";

interface RenameFileDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedFile: FileItem | null;
  onConfirm: (newName: string) => void;
}

export function RenameFileDialog({ 
  isOpen, 
  setIsOpen, 
  selectedFile, 
  onConfirm 
}: RenameFileDialogProps) {
  const [newFileName, setNewFileName] = useState("");
  
  // Update newFileName when selectedFile changes
  useEffect(() => {
    if (selectedFile) {
      setNewFileName(selectedFile.name);
    }
  }, [selectedFile]);
  
  const handleConfirm = () => {
    if (newFileName.trim()) {
      onConfirm(newFileName);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
          <DialogDescription>
            Enter a new name for "{selectedFile?.name}".
          </DialogDescription>
        </DialogHeader>
        <Input
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          className="my-4"
        />
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
