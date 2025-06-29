import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import { Button, DeleteButton } from "@/shared/ui/button";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { COMMON_KEYS } from "@/shared/i18n/keys/commonKeys";

interface DeleteDialogProps {
  onDelete: (onSuccess: () => void) => Promise<void>;
  loading?: boolean;
  title?: string;
  description?: string;
  className?: string;
  trigger?: React.ReactNode;
}

export const DeleteDialog = ({
  onDelete,
  loading = false,
  title,
  description,
  className,
  trigger,
}: DeleteDialogProps) => {
  const { t } = useTranslation([NAMESPACE_KEYS.patient]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setError(null);
    try {
      await onDelete(() => setOpen(false));
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message?: unknown }).message === "string"
      ) {
        setError(String((err as { message: unknown }).message) || null);
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <DeleteButton className={className}>
            {t(COMMON_KEYS.delete.button, { ns: NAMESPACE_KEYS.common })}
          </DeleteButton>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title ||
              t(COMMON_KEYS.delete.button, { ns: NAMESPACE_KEYS.common })}
          </DialogTitle>
          <DialogDescription>
            {description ||
              t(COMMON_KEYS.confirm.text, {
                ns: NAMESPACE_KEYS.common,
              })}
          </DialogDescription>
        </DialogHeader>
        {error != null && (
          <div className="text-sm text-red-600 mb-2">{error}</div>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            {t(COMMON_KEYS.cancel.button, { ns: NAMESPACE_KEYS.common })}
          </Button>
          <DeleteButton onClick={handleDelete} disabled={loading}>
            {loading
              ? t(COMMON_KEYS.deleting, { ns: NAMESPACE_KEYS.common })
              : t(COMMON_KEYS.delete.button, { ns: NAMESPACE_KEYS.common })}
          </DeleteButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
