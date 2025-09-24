
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

export function FileLoadingState() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <Progress className="w-40 h-1 mb-4" value={75} />
        <p className="text-muted-foreground">Loading files...</p>
      </div>
    </div>
  );
}
