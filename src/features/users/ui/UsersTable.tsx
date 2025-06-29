import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
} from "@/shared/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";

import type { User, UserRole, UserStatus } from "@/entities/users/model/user";
import { TableSkeletonRows } from "./TableSkeletonRows";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USER_KEYS } from "@/entities/users/lib/translationKeys";
import { UserMenuAction } from "./UserMenuAction";
import { formatDate } from "@/shared/lib/date";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  handleDelete: (id: string) => void;
}

export const UsersTable = ({
  users,
  isLoading,
}: UsersTableProps) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.user]);

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.Admin:
        return t(USER_KEYS.role.admin, { ns: NAMESPACE_KEYS.user });
      case UserRole.Doctor:
        return t(USER_KEYS.role.doctor, { ns: NAMESPACE_KEYS.user });
      case UserRole.Nurse:
        return t(USER_KEYS.role.nurse, { ns: NAMESPACE_KEYS.user });
      case UserRole.Receptionist:
        return t(USER_KEYS.role.receptionist, { ns: NAMESPACE_KEYS.user });
      default:
        return "Unknown";
    }
  };

  const getStatusLabel = (status: UserStatus) => {
    switch (status) {
      case UserStatus.Active:
        return t(USER_KEYS.status.active, { ns: NAMESPACE_KEYS.user });
      case UserStatus.Inactive:
        return t(USER_KEYS.status.inactive, { ns: NAMESPACE_KEYS.user });
      case UserStatus.Suspended:
        return t(USER_KEYS.status.suspended, { ns: NAMESPACE_KEYS.user });
      default:
        return "Unknown";
    }
  };

  const getStatusVariant = (status: UserStatus) => {
    switch (status) {
      case UserStatus.Active:
        return "default";
      case UserStatus.Inactive:
        return "secondary";
      case UserStatus.Suspended:
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-auto rounded-md border">
      <Table className="min-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead>
              {t(USER_KEYS.table.userId, { ns: NAMESPACE_KEYS.user })}
            </TableHead>
            <TableHead>
              {t(USER_KEYS.table.user, { ns: NAMESPACE_KEYS.user })}
            </TableHead>
            <TableHead>
              {t(USER_KEYS.table.email, { ns: NAMESPACE_KEYS.user })}
            </TableHead>
            <TableHead>
              {t(USER_KEYS.table.role, { ns: NAMESPACE_KEYS.user })}
            </TableHead>
            <TableHead>
              {t(USER_KEYS.table.status, { ns: NAMESPACE_KEYS.user })}
            </TableHead>
            <TableHead>
              {t(USER_KEYS.table.contact, { ns: NAMESPACE_KEYS.user })}
            </TableHead>
            <TableHead>
              {t(USER_KEYS.table.nationality, { ns: NAMESPACE_KEYS.user })}
            </TableHead>
            <TableHead>
              {t(USER_KEYS.table.createdAt, { ns: NAMESPACE_KEYS.user })}
            </TableHead>
            <TableHead>
              {t(USER_KEYS.list.actions, { ns: NAMESPACE_KEYS.user })}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Render skeleton rows
            Array.from({ length: 5 }).map((_, idx) => (
              <TableSkeletonRows key={`skeleton-${idx}`} />
            ))
          ) : users.length === 0 ? (
            <TableEmpty
              message={t(USER_KEYS.list.noUsers, {
                ns: NAMESPACE_KEYS.user,
              })}
            />
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="font-mono text-sm">{user.id}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user.personalImageURL || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {user.firstName?.charAt(0) ?? ""}
                        {user.lastName?.charAt(0) ?? ""}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {[
                          user.firstName,
                          user.secondName,
                          user.thirdName,
                          user.lastName,
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{user.email}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {getRoleLabel(user.role)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(user.status) as any}>
                    {getStatusLabel(user.status)}
                  </Badge>
                </TableCell>
                <TableCell>{user.callPhoneNumber}</TableCell>
                <TableCell>{user.nationalityName}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatDate(user.createdAt)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <UserMenuAction id={user.id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};