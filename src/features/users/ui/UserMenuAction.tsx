import { Button, DeleteButton } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { COMMON_KEYS } from "@/shared/i18n/keys/commonKeys";
import { USERS_ROUTES } from "@/entities/users/routes";
import UserDeleteDialog from "@/features/users/ui/UserDeleteDialog";
import { USER_KEYS } from "@/entities/users/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { useTranslation } from "react-i18next";

export const UserMenuAction = ({ id }: { id: string }) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.user]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <MoreHorizontal className="h-4 w-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to={`${USERS_ROUTES.MAIN_PATH}/${id}`}>
            <Eye className="mr-2 h-4 w-4" />
            {t(USER_KEYS.list.viewDetails, {
              ns: NAMESPACE_KEYS.user,
            })}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to={`${USERS_ROUTES.MAIN_PATH}/${id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            {t(COMMON_KEYS.actions.edit, {
              ns: NAMESPACE_KEYS.common,
            })}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <UserDeleteDialog
            userId={id}
            trigger={
              <DeleteButton
                size="sm"
                className="text-red-600 bg-white hover:bg-accent cursor-pointer w-full justify-normal"
              >
                {t(COMMON_KEYS.delete.button, {
                  ns: NAMESPACE_KEYS.common,
                })}
              </DeleteButton>
            }
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};