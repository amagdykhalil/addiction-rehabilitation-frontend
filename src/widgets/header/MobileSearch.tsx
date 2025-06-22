import { Input } from "@/shared/ui";
import { Search } from "lucide-react";

export const MobileSearch = () => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    <Input placeholder="Search..." className="pl-10" />
  </div>
);
