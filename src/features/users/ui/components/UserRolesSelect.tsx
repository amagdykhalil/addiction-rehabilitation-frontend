import { useTranslation } from "react-i18next";
import { Users } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import { useFormContext, Controller } from "react-hook-form";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import type { UserFormData } from "../types";
import { useState, useRef, useLayoutEffect } from "react";
import useGetRoles from "@/features/roles/hooks/useGetRoles";
import { useCurrentLanguage } from "@/shared/hooks/useCurrentLanguage";

const MIN_DIALOG_WIDTH = 220;

export function UserRolesSelect() {
  const { t } = useTranslation([NAMESPACE_KEYS.users, NAMESPACE_KEYS.common]);
  const form = useFormContext<UserFormData>();
  const { roles, isLoading } = useGetRoles();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [contentWidth, setContentWidth] = useState<number>(MIN_DIALOG_WIDTH);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { isArabic } = useCurrentLanguage();

  useLayoutEffect(() => {
    if (triggerRef.current) {
      setContentWidth(
        triggerRef.current.offsetWidth <= MIN_DIALOG_WIDTH
          ? MIN_DIALOG_WIDTH
          : triggerRef.current.offsetWidth,
      );
    }
  }, [popoverOpen]);

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1">
        <Users className="h-4 w-4 mr-1" />
        {t(USERS_KEYS.form.roles, { ns: NAMESPACE_KEYS.users })}
        <span className="text-destructive">*</span>
      </Label>
      <Controller
        control={form.control}
        name="Roles"
        render={({ field }) => (
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-between"
                ref={triggerRef}
              >
                {field.value && field.value.length > 0
                  ? roles
                      .filter((role) => field.value?.includes(role.id))
                      .map((role) => (isArabic ? role.name_ar : role.name_en))
                      .join(", ")
                  : t(USERS_KEYS.form.selectRoles, {
                      ns: NAMESPACE_KEYS.users,
                    })}
              </Button>
            </PopoverTrigger>
            <PopoverContent style={{ width: contentWidth }} className="w-full">
              {isLoading ? (
                <div className="text-center py-2">
                  {t("loading", { ns: NAMESPACE_KEYS.common })}
                </div>
              ) : (
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                  {roles.map((role) => (
                    <label
                      key={role.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={field.value?.includes(role.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...(field.value || []), role.id]);
                          } else {
                            field.onChange(
                              (field.value || []).filter(
                                (id) => id !== role.id,
                              ),
                            );
                          }
                        }}
                      />
                      <span>{isArabic ? role.name_ar : role.name_en}</span>
                    </label>
                  ))}
                </div>
              )}
            </PopoverContent>
          </Popover>
        )}
      />
      {form.formState.errors.Roles && (
        <p className="text-sm text-destructive">
          {form.formState.errors.Roles.message}
        </p>
      )}
    </div>
  );
}
