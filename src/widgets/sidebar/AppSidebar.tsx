import {
  LayoutDashboard as IconDashboard,
  Users as IconUsers,
  User as IconUser,
  Settings as IconSettings,
  UserCog,
  X,
} from "lucide-react";
import { NavMain } from "./NavMain";
import { NavSecondary } from "./NavSecondary";
import { NavUser } from "./NavUser";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar";
import { Link, generatePath } from "react-router-dom";
import { ROUTES } from "@/shared/routes";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { SIDEBAR_KEYS } from "@/shared/i18n/keys/sidebar";
import { useCurrentLanguage } from "@/shared/hooks";
import { useAuth } from "@/entities/auth/model/useAuth";
import { LogoIcon } from "@/shared/ui/LogoIcon";
import { useGetUser } from "@/features/users/hooks";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function AppSidebar() {
  const { t } = useTranslation([NAMESPACE_KEYS.sidebar, NAMESPACE_KEYS.common]);
  const { dir } = useCurrentLanguage();
  const { isArabic } = useCurrentLanguage();
  const { isAuthenticated, authData } = useAuth();
  const { user, isLoading } = useGetUser(authData?.userId || "");
  const { setOpenMobile } = useSidebar();

  const data = {
    navMain: [
      {
        title: t(SIDEBAR_KEYS.dashboard),
        url: ROUTES.HOME,
        icon: IconDashboard,
      },
      {
        title: t(SIDEBAR_KEYS.patients),
        url: ROUTES.PATIENTS.MAIN_PATH,
        icon: IconUsers,
      },
      {
        title: t(SIDEBAR_KEYS.users),
        url: ROUTES.USERS.MAIN_PATH,
        icon: IconUser,
      },
      {
        title: t(SIDEBAR_KEYS.roles),
        url: ROUTES.ROLES.MAIN_PATH,
        icon: UserCog,
      },
    ],
    navSecondary: [
      {
        title: t(SIDEBAR_KEYS.settings),
        url: generatePath(`${ROUTES.USER.MAIN_PATH}/${ROUTES.USER.SETTINGS}`),
        icon: IconSettings,
      },
    ],
  };

  if (!isAuthenticated) return null;

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      side={isArabic ? "right" : "left"}
      dir={dir}
    >
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <SidebarMenu className="border-b-[1px] flex-1">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5 mb-2"
              >
                <Link to={ROUTES.HOME}>
                  <LogoIcon />
                  <span className="text-lg font-semibold">ARC</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 md:hidden",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
            onClick={() => setOpenMobile(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="w-60">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user || undefined} loading={isLoading} />
      </SidebarFooter>
    </Sidebar>
  );
}
