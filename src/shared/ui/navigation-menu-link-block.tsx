import { NavigationMenuLink } from "./navigation-menu";
import { forwardRef } from "react";
import type { ComponentProps } from "react";

interface NavigationMenuLinkBlockProps
  extends ComponentProps<typeof NavigationMenuLink> {
  children: React.ReactNode;
  href: string;
}

export const NavigationMenuLinkBlock = forwardRef<
  HTMLAnchorElement,
  NavigationMenuLinkBlockProps
>(({ children, href, ...props }, ref) => (
  <NavigationMenuLink asChild {...props} ref={ref}>
    <a
      href={href}
      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
    >
      {children}
    </a>
  </NavigationMenuLink>
));
NavigationMenuLinkBlock.displayName = "NavigationMenuLinkBlock";
