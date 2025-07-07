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
import type { User } from "@/entities/users/model";
import { TableSkeletonRows } from "./TableSkeletonRows";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { UserMenuAction } from "./UserMenuAction";
import { NotProvidedText } from "@/shared/ui/NotProvidedText";
import { ActiveStatusText } from "@/shared/ui/ActiveStatusText";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
}

export const UsersTable = ({ users, isLoading }: UsersTableProps) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.users]);

  return (
    <div className="w-full max-w-full overflow-x-auto rounded-md border">
      <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead>
              {t(USERS_KEYS.table.userId, { ns: NAMESPACE_KEYS.users })}
            </TableHead>
            <TableHead>
              {t(USERS_KEYS.table.user, { ns: NAMESPACE_KEYS.users })}
            </TableHead>
            <TableHead>
              {t(USERS_KEYS.table.gender, { ns: NAMESPACE_KEYS.users })}
            </TableHead>
            <TableHead>
              {t(USERS_KEYS.table.roles, { ns: NAMESPACE_KEYS.users })}
            </TableHead>
            <TableHead>
              {t(USERS_KEYS.table.isActive, { ns: NAMESPACE_KEYS.users })}
            </TableHead>
            <TableHead>
              {t(USERS_KEYS.table.contact, { ns: NAMESPACE_KEYS.users })}
            </TableHead>
            <TableHead>
              {t(USERS_KEYS.table.nationality, { ns: NAMESPACE_KEYS.users })}
            </TableHead>
            <TableHead>
              {t(USERS_KEYS.list.actions, { ns: NAMESPACE_KEYS.users })}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <TableSkeletonRows key={`skeleton-${idx}`} />
            ))
          ) : users.length === 0 ? (
            <TableEmpty
              message={t(USERS_KEYS.list.noUsers, {
                ns: NAMESPACE_KEYS.users,
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
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {user.gender === 0
                    ? t(USERS_KEYS.gender.male, {
                        ns: NAMESPACE_KEYS.users,
                      })
                    : t(USERS_KEYS.gender.female, {
                        ns: NAMESPACE_KEYS.users,
                      })}
                </TableCell>
                <TableCell>
                  {user.roles.length > 0 ? (
                    user.roles.join(", ")
                  ) : (
                    <NotProvidedText>
                      {t(USERS_KEYS.details.notProvided, {
                        ns: NAMESPACE_KEYS.users,
                      })}
                    </NotProvidedText>
                  )}
                </TableCell>
                <TableCell>
                  <ActiveStatusText isActive={user.isActive}>
                    {user.isActive
                      ? t(USERS_KEYS.filters.active, {
                          ns: NAMESPACE_KEYS.users,
                        })
                      : t(USERS_KEYS.filters.inactive, {
                          ns: NAMESPACE_KEYS.users,
                        })}
                  </ActiveStatusText>
                </TableCell>
                <TableCell>{user.callPhoneNumber}</TableCell>
                <TableCell>{user.nationalityName}</TableCell>
                <TableCell className="text-start">
                  <UserMenuAction
                    user={user}
                    id={user.id}
                    isActive={user.isActive}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
