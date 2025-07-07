import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { COMMON_KEYS } from "@/shared/i18n/keys";

interface FormActionsProps {
  onCancel?: () => void;
  onSubmit?: () => void;
  isLoading?: boolean;
  submitText?: string;
  cancelText?: string;
  className?: string;
  showCancel?: boolean;
}

export function FormActions({
  onCancel,
  onSubmit,
  isLoading = false,
  submitText = "Save",
  className,
  showCancel = false,
}: FormActionsProps) {
  const { t } = useTranslation();
  return (
    <div className={cn("flex justify-end space-x-4", className)}>
      {showCancel && (
        <Button type="button" variant="outline" onClick={onCancel}>
          {t(COMMON_KEYS.cancel.button, {
            ns: NAMESPACE_KEYS.common,
          })}
        </Button>
      )}
      <Button type="submit" disabled={isLoading} onClick={onSubmit}>
        {isLoading
          ? t(COMMON_KEYS.saving, {
              ns: NAMESPACE_KEYS.common,
            })
          : submitText}
      </Button>
    </div>
  );
}
