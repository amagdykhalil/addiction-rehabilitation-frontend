import { Button } from "@/shared/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Bell, Search, User, Settings, LogOut } from "lucide-react";
import { Input } from "@/shared/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { LanguageToggle } from "./LanguageToggle";
import type { TFunction } from "i18next";
import { USER_KEYS } from "@/entities/user/lib/translationKeys";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import type { Locale } from "@/shared/i18n/constants/locales";
import { NavigationMenuLinkBlock } from "@/shared/ui/navigation-menu-link-block";
import { Link } from "react-router-dom";

interface AuthenticatedNavProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
  currentLanguage: Locale;
  onLanguageChange?: (language: Locale) => void;
  isLoading?: boolean;
  t: TFunction;
}

export const AuthenticatedNav = ({
  user,
  onLogout,
  currentLanguage,
  onLanguageChange,
  isLoading,
  t,
}: AuthenticatedNavProps) => (
  <>
    {/* Search Bar - Desktop */}
    <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-10 w-full" />
      </div>
    </div>
    {/* Navigation Menu - Desktop */}
    <div className="hidden md:flex items-center space-x-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {t(USER_KEYS.dashboard.title, { ns: NAMESPACE_KEYS.user })}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[400px]">
                <NavigationMenuLinkBlock href="/dashboard">
                  <div className="text-sm font-medium leading-none">
                    {t(USER_KEYS.dashboard.overview, {
                      ns: NAMESPACE_KEYS.user,
                    })}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {t(USER_KEYS.dashboard.overviewDesc, {
                      ns: NAMESPACE_KEYS.user,
                    })}
                  </p>
                </NavigationMenuLinkBlock>
                <NavigationMenuLinkBlock href="/dashboard/projects">
                  <div className="text-sm font-medium leading-none">
                    {t(USER_KEYS.dashboard.projects, {
                      ns: NAMESPACE_KEYS.user,
                    })}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {t(USER_KEYS.dashboard.projectsDesc, {
                      ns: NAMESPACE_KEYS.user,
                    })}
                  </p>
                </NavigationMenuLinkBlock>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {/* Notifications */}
      <Button variant="ghost" size="sm" className="relative">
        <Bell className="h-4 w-4" />
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
      </Button>
      <LanguageToggle
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        disabled={isLoading}
      />
      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full cursor-pointer"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.avatar || "/placeholder.svg"}
                alt={user?.name}
              />
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{user?.name}</p>
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              {t(USER_KEYS.profile.title, { ns: NAMESPACE_KEYS.user })}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              {t(USER_KEYS.settings.title, { ns: NAMESPACE_KEYS.user })}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onLogout}
            className="flex items-center cursor-pointer"
            disabled={isLoading}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t(AUTH_KEYS.login.logout, { ns: NAMESPACE_KEYS.auth })}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </>
);
