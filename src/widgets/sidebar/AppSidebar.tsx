import {
  LayoutDashboard as IconDashboard,
  Users as IconUsers,
  User as IconUser,
  Search as IconSearch,
  Settings as IconSettings,
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
} from "@/shared/ui/sidebar";
import { Link, generatePath } from "react-router-dom";
import { ROUTES } from "@/shared/routes";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { SIDEBAR_KEYS } from "@/shared/i18n/keys/sidebar";
import { USER_ROUTES } from "@/entities/user/routes";
import { useCurrentLanguage } from "@/shared/hooks/useCurrentLanguage";
import { useAuth } from "@/entities/auth/model/useAuth";
import { LogoIcon } from "@/shared/ui/LogoIcon";

export function AppSidebar() {
  const { t } = useTranslation([NAMESPACE_KEYS.sidebar, NAMESPACE_KEYS.common]);
  const { dir } = useCurrentLanguage();
  const { isArabic } = useCurrentLanguage();
  const { isAuthenticated } = useAuth();
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: t(SIDEBAR_KEYS.dashboard),
        url: ROUTES.HOME,
        icon: IconDashboard,
      },
      {
        title: t(SIDEBAR_KEYS.patients),
        url: ROUTES.PATIENT.MAIN_PATH,
        icon: IconUsers,
      },
      {
        title: t(SIDEBAR_KEYS.users),
        url: ROUTES.USER.MAIN_PATH,
        icon: IconUser,
      },
        {
        title: "users dashboard",
        url: "users"
        icon: IconUser,
      },
    ],
    navSecondary: [
      {
        title: t(SIDEBAR_KEYS.search),
        url: "#",
        icon: IconSearch,
      },
      {
        title: t(SIDEBAR_KEYS.settings),
        url: generatePath(`${USER_ROUTES.MAIN_PATH}/${USER_ROUTES.SETTINGS}`),
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
        <SidebarMenu className="border-b-[1px]">
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
      </SidebarHeader>
      <SidebarContent className="w-60">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
