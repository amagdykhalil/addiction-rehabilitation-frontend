import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { useTranslation } from "react-i18next";
import useAddRoles from "../hooks/useAddRoles";
import ROLES_KEYS from "@/entities/roles/lib/translationKeys";
import { FormField } from "@/shared/ui/form/FormField";
import { Button } from "@/shared/ui";
import { Plus } from "lucide-react";
import ActionDialog from "@/shared/ui/ActionDialog";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAddRolesSchema, type AddRolesSchemaData } from "../types";

export function AddRolesDialog() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.roles]);
  const { addRoles, isLoading } = useAddRoles();

  const AddRolesSchema = createAddRolesSchema(t);
  const methods = useForm<AddRolesSchemaData>({
    resolver: zodResolver(AddRolesSchema),
    defaultValues: { roles: [{ name_en: "", name_ar: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "roles",
  });

  function onClose() {
    methods.reset({ roles: [{ name_en: "", name_ar: "" }] });
  }
  const handleAddRoles = async (close: () => void) => {
    const valid = await methods.trigger();
    if (!valid) return;
    const values = methods.getValues();
    await addRoles(
      { roles: values.roles },
      {
        onSuccess: () => {
          methods.reset({ roles: [{ name_en: "", name_ar: "" }] });
          close();
        },
      },
    );
  };
  return (
    <ActionDialog
      title={t(ROLES_KEYS.dialog.addTitle, { ns: NAMESPACE_KEYS.roles })}
      description={t(ROLES_KEYS.dialog.addDescription, {
        ns: NAMESPACE_KEYS.roles,
      })}
      loading={isLoading}
      onClose={onClose}
      variant="default"
      trigger={
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" />
          {t(ROLES_KEYS.list.addRole, { ns: NAMESPACE_KEYS.roles })}
        </Button>
      }
      onAction={handleAddRoles}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})} className="space-y-2">
          {fields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 items-top">
              <FormField
                label={t(ROLES_KEYS.dialog.nameEn, {
                  ns: NAMESPACE_KEYS.roles,
                })}
                name={`roles.${idx}.name_en`}
                required
                inputProps={methods.register(`roles.${idx}.name_en`)}
                error={
                  methods.formState.errors.roles?.[idx]?.name_en
                    ?.message as string
                }
              />
              <FormField
                label={t(ROLES_KEYS.dialog.nameAr, {
                  ns: NAMESPACE_KEYS.roles,
                })}
                name={`roles.${idx}.name_ar`}
                required
                inputProps={methods.register(`roles.${idx}.name_ar`)}
                error={
                  methods.formState.errors.roles?.[idx]?.name_ar
                    ?.message as string
                }
              />
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-5"
                  onClick={() => remove(idx)}
                >
                  {t(ROLES_KEYS.dialog.removeRow, {
                    ns: NAMESPACE_KEYS.roles,
                  })}
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (fields.length < 3) {
                append({ name_en: "", name_ar: "" });
              }
            }}
            className="w-full mt-2"
            disabled={fields.length >= 3}
          >
            <Plus className="mr-2 h-4 w-4" />
            {t(ROLES_KEYS.dialog.addRow, { ns: NAMESPACE_KEYS.roles })}
          </Button>
        </form>
      </FormProvider>
    </ActionDialog>
  );
}
