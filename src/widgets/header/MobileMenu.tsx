import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { Button } from "@/shared/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { UnAuthenticatedSidebar } from "../sidebar";
import { useCurrentLanguage } from "@/shared/hooks";

export const MobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isArabic } = useCurrentLanguage();
  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isArabic ? "right" : "left"}
        className="w-[250px] sm:w-[300px]"
      >
        <div className="flex flex-col space-y-4 mt-10">
          <UnAuthenticatedSidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
};
