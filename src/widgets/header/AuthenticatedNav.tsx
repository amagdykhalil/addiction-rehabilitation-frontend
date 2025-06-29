import { Button } from "@/shared/ui/button";
import { Bell } from "lucide-react";

export const AuthenticatedNav = () => (
  <div className="flex items-center gap-2">
    <div className="hidden md:flex items-center space-x-4">
      {/* Notifications */}
      <Button variant="ghost" size="sm" className="relative">
        <Bell className="h-4 w-4" />
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
      </Button>
    </div>
  </div>
);
