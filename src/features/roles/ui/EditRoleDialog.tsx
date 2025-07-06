import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { useTranslation } from "react-i18next";
import useUpdateRole from "../hooks/useUpdateRole";
import { useEffect } from "react";
import ROLES_KEYS from "@/entities/roles/lib/translationKeys";
import ActionDialog from "@/shared/ui/ActionDialog";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RoleDto } from "@/entities/roles/api";
import { CreateEditRoleSchema, type EditRoleSchemaData } from "../types";
import { Button } from "@/shared/ui";
import { Edit } from "lucide-react";
import { FormField } from "@/shared/ui/form/FormField";
import { useCurrentLanguage } from "@/shared/hooks/useCurrentLanguage";

export function EditRoleDialog({ role }: { role: RoleDto }) {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.roles]);
  const { updateRole, isLoading: isSaving } = useUpdateRole();
  const { isArabic } = useCurrentLanguage();

  const schema = CreateEditRoleSchema(t);

  const methods = useForm<EditRoleSchemaData>({
    resolver: zodResolver(schema),
    defaultValues: { name_en: "", name_ar: "" },
  });

  // Set form values when role loads
  useEffect(() => {
    if (role) {
      methods.reset({ name_en: role.name_en, name_ar: role.name_ar });
    }
  }, [role, methods]);

  // Reset form on close
  function onClose() {
    methods.reset({
      name_en: role?.name_en || "",
      name_ar: role?.name_ar || "",
    });
  }

  const handleEditRole = async (close: () => void) => {
    const valid = await methods.trigger();
    if (!valid) return;
    const values = methods.getValues();
    updateRole(
      { id: role.id, name_en: values.name_en, name_ar: values.name_ar },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  return (
    <ActionDialog
      onClose={onClose}
      title={
        t(ROLES_KEYS.dialog.editTitle, { ns: NAMESPACE_KEYS.roles }) +
        ` (${isArabic ? role.name_ar : role.name_en})`
      }
      description={t(ROLES_KEYS.dialog.editDescription, {
        ns: NAMESPACE_KEYS.roles,
      })}
      loading={isSaving}
      onAction={handleEditRole}
      variant="default"
      trigger={
        <Button variant="ghost" className="w-full justify-normal font-normal">
          <Edit className="mr-2 h-4 w-4" />
          {t(ROLES_KEYS.list.edit, { ns: NAMESPACE_KEYS.roles })}
        </Button>
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})} className="space-y-2">
          <FormField
            label={t(ROLES_KEYS.dialog.nameEn, {
              ns: NAMESPACE_KEYS.roles,
            })}
            name="name_en"
            required
            inputProps={methods.register(`name_en`)}
            error={methods.formState.errors.name_en?.message as string}
          />
          <FormField
            label={t(ROLES_KEYS.dialog.nameAr, {
              ns: NAMESPACE_KEYS.roles,
            })}
            name="name_ar"
            required
            inputProps={methods.register(`name_ar`)}
            error={methods.formState.errors.name_en?.message as string}
          />
        </form>
      </FormProvider>
    </ActionDialog>
  );
}
