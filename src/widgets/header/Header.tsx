"use client";

import { Logo } from "@/shared/ui/Logo";
import { AuthenticatedNav } from "./AuthenticatedNav";
import { UnauthenticatedNav } from "./UnauthenticatedNav";
import { MobileMenu } from "./MobileMenu";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { useCurrentLanguage } from "@/shared/hooks";
import { useAuth } from "@/entities/auth/model/useAuth";
import { PageTitle } from "@/shared/ui/PageTitle";

export const Header = () => {
  const { dir, isArabic } = useCurrentLanguage();
  const { isAuthenticated } = useAuth();

  return (
    <header
      className="flex items-center gap-2 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      dir={dir}
    >
      {isAuthenticated && (
        <>
          <SidebarTrigger className="-ml-1 cursor-pointer" />
          <Separator
            aria-orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <PageTitle />
        </>
      )}
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        {!isAuthenticated && <Logo />}
        <div className={`${isArabic ? "mr-auto" : "ml-auto"}`}>
          {isAuthenticated ? <AuthenticatedNav /> : <UnauthenticatedNav />}
          {!isAuthenticated && <MobileMenu />}
        </div>
      </div>
    </header>
  );
};
