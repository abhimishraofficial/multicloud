
import { Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FileSearchProps {
  searchQuery: string;
  filterSource: string;
  setSearchQuery: (query: string) => void;
  setFilterSource: (source: string) => void;
}

export function FileSearch({
  searchQuery,
  filterSource,
  setSearchQuery,
  setFilterSource,
}: FileSearchProps) {
  return (
    <div className="flex flex-1 gap-2">
      <div className="relative flex-1">
        <Input
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Filter className="h-4 w-4 text-muted-foreground" />
        </div>
        {searchQuery && (
          <button 
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>
      
      <Select
        value={filterSource}
        onValueChange={(value) => setFilterSource(value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          <SelectItem value="google-drive">Google Drive</SelectItem>
          <SelectItem value="onedrive">OneDrive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
