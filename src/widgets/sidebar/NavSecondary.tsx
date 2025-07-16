"use client";

import * as React from "react";
// No icon import needed here, icons are passed as props from AppSidebar

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarNavLink,
} from "@/shared/ui/sidebar";
import { SidebarLanguageToggle } from "./SidebarLanguageToggle";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: React.ElementType;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarNavLink tooltip={item.title} to={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </SidebarNavLink>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem key="LanguageToggle">
            <SidebarMenuButton asChild>
              <SidebarLanguageToggle />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
