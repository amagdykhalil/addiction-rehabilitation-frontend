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
import { ROUTES } from "@/shared/routes/routesPaths";
import PatientDeleteDialog from "@/features/patients/ui/PatientDeleteDialog";
import { PATIENT_KEYS } from "@/entities/patients/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { useTranslation } from "react-i18next";

export const PatientMenuAction = ({ id }: { id: string }) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.patient]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <MoreHorizontal className="h-4 w-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to={`${ROUTES.PATIENT.MAIN_PATH}/${id}`}>
            <Eye className="mr-2 h-4 w-4" />
            {t(PATIENT_KEYS.list.viewDetails, {
              ns: NAMESPACE_KEYS.patient,
            })}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to={`${ROUTES.PATIENT.MAIN_PATH}/${id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            {t(COMMON_KEYS.actions.edit, {
              ns: NAMESPACE_KEYS.common,
            })}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <PatientDeleteDialog
            patientId={id}
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
