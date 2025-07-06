import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";

interface ActionDialogProps {
  onAction: (onSuccess: () => void) => void | Promise<void>;
  loading?: boolean;
  trigger?: React.ReactNode;
  className?: string;
  actionClassName?: string;
  title: string;
  description: React.ReactNode | string;
  children?: React.ReactNode;
  onClose?: () => void;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export const ActionDialog: React.FC<ActionDialogProps> = ({
  onAction,
  loading,
  trigger,
  className,
  actionClassName,
  title,
  description,
  children,
  onClose,
  variant,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleAction = async () => {
    await onAction(() => setOpen(false));
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) onClose?.();
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" className={className}>
            {title}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children && <div className="mb-4">{children}</div>}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant={variant || "destructive"}
            className={actionClassName}
            onClick={handleAction}
            disabled={loading}
          >
            {title}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
