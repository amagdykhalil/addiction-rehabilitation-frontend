import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { Button } from "@/shared/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { MobileNavigation } from "./MobileNavigation";
import type { MobileMenuProps } from "../types/MobileMenuProps";

export const MobileMenu = (props: MobileMenuProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px] sm:w-[300px]">
        <div className="flex flex-col space-y-4 mt-10">
          <MobileNavigation {...props} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
