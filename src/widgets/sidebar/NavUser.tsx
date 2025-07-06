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
import { useLogout } from "@/features/auth/hooks";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { USER_KEYS } from "@/entities/user/lib/translationKeys";
import { Spinner } from "@/shared/ui/spinner";
import type { User } from "@/entities/users/model";
import { ROUTES } from "@/shared/routes";

export function NavUser({ user, loading }: { user?: User; loading: boolean }) {
  const { isMobile } = useSidebar();
  const { logout: onLogout, isLoading: isLogoutLoading } = useLogout();
  const { t } = useTranslation([NAMESPACE_KEYS.user]);
  const isLoading = loading || isLogoutLoading;
  const initials = user
    ? `${user.firstName?.charAt(0) ?? ""}${user.lastName?.charAt(0) ?? ""}`
    : "";
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              {isLoading || !user ? (
                <Spinner className="mx-auto" />
              ) : (
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage src={user.personalImageURL} alt={initials} />
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              )}
              {!isLoading && user && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{initials}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              )}
              {!isLoading && user && (
                <IconDotsVertical className="ml-auto size-4" />
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.personalImageURL} alt={initials} />
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{initials}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link
                to={generatePath(
                  `${USER_ROUTES.MAIN_PATH}/${USER_ROUTES.PROFILE}`
                )}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <IconUserCircle />
                  {t(USER_KEYS.account.title, { ns: NAMESPACE_KEYS.user })}
                </DropdownMenuItem>
              </Link>
              <Link
                to={
                  generatePath(
                    `${USER_ROUTES.MAIN_PATH}/${USER_ROUTES.SETTINGS}`
                  ) + "?section=notifications"
                }
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
