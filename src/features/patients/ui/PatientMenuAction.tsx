import { Button, DeleteButton } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal } from "lucide-react";
import { generatePath, Link } from "react-router-dom";
import { COMMON_KEYS } from "@/shared/i18n/keys/commonKeys";
import PatientDeleteDialog from "@/features/patients/ui/PatientDeleteDialog";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { useTranslation } from "react-i18next";
import { PATIENTS_ROUTES } from "@/entities/patients/routes";
import type { Patient } from "@/entities/patients/model";

export const PatientMenuAction = ({
  id,
  patient,
}: {
  id: string;
  patient: Patient;
}) => {
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
          <Link
            to={generatePath(
              `${PATIENTS_ROUTES.MAIN_PATH}/${PATIENTS_ROUTES.DETAIL}`,
              {
                patientId: id,
              }
            )}
          >
            <Eye className="mr-2 h-4 w-4" />
            {t(PATIENTS_KEYS.list.viewDetails, {
              ns: NAMESPACE_KEYS.patient,
            })}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            to={generatePath(
              `${PATIENTS_ROUTES.MAIN_PATH}/${PATIENTS_ROUTES.EDIT}`,
              {
                patientId: id,
              }
            )}
          >
            <Edit className="mr-2 h-4 w-4" />
            {t(COMMON_KEYS.actions.edit, {
              ns: NAMESPACE_KEYS.common,
            })}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <PatientDeleteDialog
            patientId={id}
            patient={patient}
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
