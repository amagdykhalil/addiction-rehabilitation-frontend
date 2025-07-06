import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/ui/card";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { ROLES_KEYS } from "@/entities/roles/lib/translationKeys";
import { useGetRoles } from "@/features/roles/hooks/useGetRoles";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
} from "@/shared/ui/table";
import { AddRolesDialog } from "@/features/roles/ui/AddRolesDialog";
import { RoleMenuAction } from "@/features/roles/ui/RoleMenuAction";
import { PageHeader } from "@/shared/ui";

// --- Main Page ---
export const RoleListPage = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.roles]);

  const { roles, isLoading } = useGetRoles();
  return (
    <div className="space-y-4 sm:space-y-6">
      <PageHeader
        title={t(ROLES_KEYS.list.title, { ns: NAMESPACE_KEYS.roles })}
        subtitle={t(ROLES_KEYS.list.subtitle, {
          ns: NAMESPACE_KEYS.roles,
        })}
        actions={[<AddRolesDialog />]}
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-lg">
              {t(ROLES_KEYS.list.title, { ns: NAMESPACE_KEYS.roles })}
            </CardTitle>
            <CardDescription>
              {t(ROLES_KEYS.list.title, { ns: NAMESPACE_KEYS.roles })}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <div className="w-full max-w-full overflow-x-auto rounded-md border">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {t(ROLES_KEYS.list.roleId, { ns: NAMESPACE_KEYS.roles })}
                  </TableHead>
                  <TableHead>
                    {t(ROLES_KEYS.list.nameEn, { ns: NAMESPACE_KEYS.roles })}
                  </TableHead>
                  <TableHead>
                    {t(ROLES_KEYS.list.nameAr, { ns: NAMESPACE_KEYS.roles })}
                  </TableHead>
                  <TableHead>
                    {t(ROLES_KEYS.list.actions, { ns: NAMESPACE_KEYS.roles })}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4}>Loading...</TableCell>
                  </TableRow>
                ) : roles.length === 0 ? (
                  <TableEmpty
                    message={t(ROLES_KEYS.list.noRoles, {
                      ns: NAMESPACE_KEYS.roles,
                    })}
                  />
                ) : (
                  roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>{role.id}</TableCell>
                      <TableCell>{role.name_en}</TableCell>
                      <TableCell>{role.name_ar}</TableCell>
                      <TableCell className="text-start">
                        <RoleMenuAction role={role} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleListPage;
