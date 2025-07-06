import type { RoleDto } from "@/entities/roles/api";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { useRemoveRoles } from "../hooks/useRemoveRoles";
import ActionDialog from "@/shared/ui/ActionDialog";
import ROLES_KEYS from "@/entities/roles/lib/translationKeys";
import { Button } from "@/shared/ui";
import { Trash } from "lucide-react";
import { useCurrentLanguage } from "@/shared/hooks/useCurrentLanguage";

export function DeleteRoleDialog({ role }: { role: RoleDto }) {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.roles]);
  const { removeRoles, isLoading } = useRemoveRoles();
  const { isArabic } = useCurrentLanguage();

  const handleDeleteRole = async (close: () => void) => {
    await removeRoles(
      { roleIds: [role.id] },
      {
        onSuccess: () => {
          close();
        },
      }
    );
  };

  return (
    <ActionDialog
      title={
        t(ROLES_KEYS.dialog.deleteTitle, { ns: NAMESPACE_KEYS.roles }) +
        ` (${isArabic ? role.name_ar : role.name_en})`
      }
      description={t(ROLES_KEYS.dialog.deleteDescription, {
        ns: NAMESPACE_KEYS.roles,
      })}
      loading={isLoading}
      onAction={handleDeleteRole}
      trigger={
        <Button variant="ghost" className="w-full justify-normal text-red-600">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      }
    />
  );
}
