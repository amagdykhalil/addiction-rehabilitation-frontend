import { Button } from "./button";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import type { LinkProps } from "react-router-dom";

interface ButtonLinkProps extends React.ComponentProps<typeof Button> {
  to: LinkProps["to"];
  children: React.ReactNode;
}

export const ButtonLink = forwardRef<HTMLButtonElement, ButtonLinkProps>(
  ({ to, children, ...buttonProps }, ref) => (
    <Button asChild {...buttonProps} ref={ref}>
      <Link to={to}>{children}</Link>
    </Button>
  ),
);
ButtonLink.displayName = "ButtonLink";
