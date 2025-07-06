import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Power } from "lucide-react";
import { generatePath, Link } from "react-router-dom";
import { COMMON_KEYS } from "@/shared/i18n/keys/commonKeys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { useTranslation } from "react-i18next";
import { USERS_ROUTES } from "@/entities/users/routes/usersRoutesPaths";
import UserActivateDialog from "./UserActivateDialog";
import UserDeactivateDialog from "./UserDeactivateDialog";
import UpdateUserRolesDialog from "./components/UpdateUserRolesDialog";
import type { User } from "@/entities/users/model";

export const UserMenuAction = ({
  id,
  isActive,
  user,
}: {
  id: number;
  isActive: boolean;
  user: User;
}) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.users]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <MoreHorizontal className="h-4 w-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            to={generatePath(
              `${USERS_ROUTES.MAIN_PATH}/${USERS_ROUTES.DETAIL}`,
              {
                userId: String(id),
              }
            )}
          >
            <Eye className="mr-2 h-4 w-4" />
            {t(USERS_KEYS.list.viewDetails, {
              ns: NAMESPACE_KEYS.users,
            })}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            to={generatePath(`${USERS_ROUTES.MAIN_PATH}/${USERS_ROUTES.EDIT}`, {
              userId: String(id),
            })}
          >
            <Edit className="mr-2 h-4 w-4" />
            {t(COMMON_KEYS.actions.edit, {
              ns: NAMESPACE_KEYS.common,
            })}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <UpdateUserRolesDialog user={user} userId={id} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          {isActive ? (
            <UserDeactivateDialog
              userId={id}
              user={user}
              trigger={
                <Button
                  variant="ghost"
                  className="w-full justify-normal text-red-600"
                >
                  <Power className="mr-2 h-4 w-4" />
                  {t(USERS_KEYS.deactivate.button, {
                    ns: NAMESPACE_KEYS.users,
                  })}
                </Button>
              }
            />
          ) : (
            <UserActivateDialog
              user={user}
              userId={id}
              trigger={
                <Button
                  variant="ghost"
                  className="w-full justify-normal text-green-600"
                >
                  <Power className="mr-2 h-4 w-4" />
                  {t(USERS_KEYS.activate.button, { ns: NAMESPACE_KEYS.users })}
                </Button>
              }
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuAction;
