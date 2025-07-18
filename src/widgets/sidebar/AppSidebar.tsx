import {
  LayoutDashboard as IconDashboard,
  Users as IconUsers,
  User as IconUser,
  Settings as IconSettings,
  UserCog,
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
  SidebarMobileClose,
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

export function AppSidebar() {
  const { t } = useTranslation([NAMESPACE_KEYS.sidebar, NAMESPACE_KEYS.common]);
  const { dir } = useCurrentLanguage();
  const { isArabic } = useCurrentLanguage();
  const { isAuthenticated, authData } = useAuth();
  const { user, isLoading } = useGetUser(authData?.userId || "");

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
          <SidebarMobileClose />
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
