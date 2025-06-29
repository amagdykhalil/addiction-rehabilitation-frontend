import type { ReactNode } from "react";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/shared/lib";

export interface PageHeaderAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: ReactNode;
  disabled?: boolean;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: {
    href: string;
    label: string;
  };
  actions?: (PageHeaderAction | ReactNode)[];
  className?: string;
}

/**
 * Reusable PageHeader component for consistent page headers across the application.
 *
 * Features:
 * - Responsive design (stacks vertically on mobile, horizontal on desktop)
 * - Optional back navigation with customizable label
 * - Configurable action buttons with icons
 * - Support for both navigation links and click handlers
 * - Support for ready ReactNode elements (like PatientDeleteDialog)
 *
 * @example
 * // Simple header with title only
 * <PageHeader title="Patient Details" />
 *
 * @example
 * // Header with back navigation
 * <PageHeader
 *   title="Edit Patient"
 *   subtitle="Update patient information"
 *   backTo={{
 *     href: "/patients/123",
 *     label: "Back to Patient"
 *   }}
 * />
 *
 * @example
 * // Header with action buttons
 * <PageHeader
 *   title="Patients List"
 *   subtitle="Manage patient records"
 *   actions={[
 *     {
 *       label: "Add Patient",
 *       href: "/patients/add",
 *       variant: "default",
 *       icon: <Plus className="h-4 w-4 mr-2" />
 *     },
 *     {
 *       label: "Search",
 *       onClick: () => setSearchOpen(true),
 *       variant: "outline",
 *       icon: <Search className="h-4 w-4 mr-2" />
 *     }
 *   ]}
 * />
 *
 * @example
 * // Header with ready buttons (like PatientDeleteDialog)
 * <PageHeader
 *   title="Patient Details"
 *   subtitle="View and manage patient information"
 *   backTo={{
 *     href: "/patients",
 *     label: "Back to List"
 *   }}
 *   actions={[
 *     {
 *       label: "Edit",
 *       href: "/patients/123/edit",
 *       variant: "outline",
 *       icon: <Edit className="h-4 w-4 mr-2" />
 *     },
 *     <PatientDeleteDialog patientId="123" onSuccess={handleSuccess}>
 *       <Button variant="destructive" size="sm">
 *         <Trash2 className="h-4 w-4 mr-2" />
 *         Delete
 *       </Button>
 *     </PatientDeleteDialog>
 *   ]}
 * />
 */
export function PageHeader({
  title,
  subtitle,
  backTo,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {backTo && (
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="self-start sm:self-auto"
          >
            <Link to={backTo.href}>
              <ArrowLeft className="h-4 w-4 mr-2 rtl-flip" />
              {backTo.label}
            </Link>
          </Button>
        )}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap gap-2 self-start sm:self-auto">
          {actions.map((action, index) => {
            // If action is a ReactNode (ready button), render it directly
            if (action && typeof action === "object" && !("label" in action)) {
              return (
                <div key={index} className="min-w-40">
                  {action}
                </div>
              );
            }

            // Otherwise, treat it as a PageHeaderAction object
            const actionConfig = action as PageHeaderAction;
            const buttonContent = (
              <>
                {actionConfig.icon}
                {actionConfig.label}
              </>
            );

            if (actionConfig.href) {
              return (
                <Button
                  key={index}
                  variant={actionConfig.variant || "outline"}
                  size={actionConfig.size || "sm"}
                  asChild
                  disabled={actionConfig.disabled}
                  className="min-w-40"
                >
                  <Link to={actionConfig.href}>{buttonContent}</Link>
                </Button>
              );
            }

            return (
              <Button
                key={index}
                variant={actionConfig.variant || "outline"}
                size={actionConfig.size || "sm"}
                onClick={actionConfig.onClick}
                disabled={actionConfig.disabled}
                className="min-w-40"
              >
                {buttonContent}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
