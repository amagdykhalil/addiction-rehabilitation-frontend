"use client";

import {
  MoreVertical as IconDotsVertical,
  LogOut as IconLogout,
  Bell as IconNotification,
  UserCircle as IconUserCircle,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar";
import { generatePath, Link } from "react-router-dom";
import { USER_ROUTES } from "@/entities/user/routes";
import { useLogout } from "@/features/auth/hooks";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USER_KEYS } from "@/entities/user/lib/translationKeys";
import { useCurrentLanguage } from "@/shared/hooks/useCurrentLanguage";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { logout: onLogout, isLoading } = useLogout();
  const { t } = useTranslation([NAMESPACE_KEYS.user]);
  const { dir } = useCurrentLanguage();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            dir={dir}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link
                to={generatePath(
                  `${USER_ROUTES.MAIN_PATH}/${USER_ROUTES.PROFILE}`,
                  { userId: "2" },
                )}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <IconUserCircle />
                  {t(USER_KEYS.account.title, { ns: NAMESPACE_KEYS.user })}
                </DropdownMenuItem>
              </Link>
              <Link
                to={generatePath(
                  `${USER_ROUTES.MAIN_PATH}/${USER_ROUTES.NOTIFICATIONS}`,
                )}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <IconNotification />
                  {t(USER_KEYS.notifications.title, {
                    ns: NAMESPACE_KEYS.user,
                  })}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onLogout()}
              className="cursor-pointer"
              disabled={isLoading}
            >
              <IconLogout />
              {t(USER_KEYS.logout.title, { ns: NAMESPACE_KEYS.user })}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
