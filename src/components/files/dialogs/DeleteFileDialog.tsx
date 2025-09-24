
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { FileItem } from "../types/FileTypes";

interface DeleteFileDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedFile: FileItem | null;
  onConfirm: () => void;
}

export function DeleteFileDialog({ 
  isOpen, 
  setIsOpen, 
  selectedFile, 
  onConfirm 
}: DeleteFileDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete File</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{selectedFile?.name}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
