import { Button } from "@/shared/ui/button";
import { DialogHeader } from "@/shared/ui/dialog";
import { PageHeader } from "@/shared/ui";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogTitle,
} from "@/shared/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Plus, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import usePatientSearch, {
  type PatientSearchType,
} from "@/features/patients/hooks/usePatientSearch";
import FormErrorMessage from "@/shared/ui/FormErrorMessage";
import { Input } from "@/shared/ui";
import { PATIENTS_ROUTES } from "@/entities/patients/routes";
import { generatePath } from "react-router-dom";

export const PatientsPageHeader = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.patient]);
  const {
    searchDialogOpen,
    setSearchDialogOpen,
    searchParams,
    setSearchParams,
    notFound,
    setNotFound,
    isLoading,
    error,
    setSearchTriggered,
  } = usePatientSearch();

  return (
    <>
      <PageHeader
        title={t(PATIENTS_KEYS.list.title, { ns: NAMESPACE_KEYS.patient })}
        subtitle={t(PATIENTS_KEYS.list.subtitle, {
          ns: NAMESPACE_KEYS.patient,
        })}
        actions={[
          {
            label: t(PATIENTS_KEYS.search.searchPatient, {
              ns: NAMESPACE_KEYS.patient,
            }),
            variant: "outline",
            size: "default",
            icon: <User className="h-4 w-4 mr-2" />,
            onClick: () => setSearchDialogOpen(true),
          },
          {
            label: t(PATIENTS_KEYS.search.addPatient, {
              ns: NAMESPACE_KEYS.patient,
            }),
            href: generatePath(
              `${PATIENTS_ROUTES.MAIN_PATH}/${PATIENTS_ROUTES.ADD}`
            ),
            variant: "default",
            size: "default",
            icon: <Plus className="h-4 w-4 mr-2" />,
          },
        ]}
      />

      <Dialog
        open={searchDialogOpen}
        onOpenChange={(open) => {
          setSearchDialogOpen(open);
          setNotFound(false);
        }}
      >
        <DialogContent className="w-[95vw] max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t(PATIENTS_KEYS.search.title, { ns: NAMESPACE_KEYS.patient })}
            </DialogTitle>
            <DialogDescription>
              {t(PATIENTS_KEYS.search.description, {
                ns: NAMESPACE_KEYS.patient,
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t(PATIENTS_KEYS.search.searchType, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <Select
                value={searchParams.type}
                onValueChange={(value) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    type: value as PatientSearchType,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">
                    {t(PATIENTS_KEYS.table.patientId, {
                      ns: NAMESPACE_KEYS.patient,
                    })}
                  </SelectItem>
                  <SelectItem value="nationalId">
                    {t(PATIENTS_KEYS.table.nationalId, {
                      ns: NAMESPACE_KEYS.patient,
                    })}
                  </SelectItem>
                  <SelectItem value="passport">
                    {t(PATIENTS_KEYS.table.passport, {
                      ns: NAMESPACE_KEYS.patient,
                    })}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {searchParams.type === "id"
                  ? t(PATIENTS_KEYS.table.patientId, {
                      ns: NAMESPACE_KEYS.patient,
                    })
                  : searchParams.type === "nationalId"
                    ? t(PATIENTS_KEYS.details.nationalIdNumber, {
                        ns: NAMESPACE_KEYS.patient,
                      })
                    : t(PATIENTS_KEYS.details.passportNumber, {
                        ns: NAMESPACE_KEYS.patient,
                      })}
              </label>
              <Input
                value={searchParams.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                placeholder={
                  searchParams.type === "id"
                    ? "000123"
                    : searchParams.type === "nationalId"
                      ? "1234567890"
                      : "P123456789"
                }
              />
            </div>
            {isLoading && (
              <div className="text-sm text-muted-foreground">
                {t(PATIENTS_KEYS.loading, { ns: NAMESPACE_KEYS.patient })}
              </div>
            )}
            {error && (
              <FormErrorMessage>
                {t(PATIENTS_KEYS.notFound.message, {
                  ns: NAMESPACE_KEYS.patient,
                  id: searchParams.value,
                })}
              </FormErrorMessage>
            )}
            {notFound && !isLoading && !error && (
              <FormErrorMessage>
                {t(PATIENTS_KEYS.notFound.message, {
                  ns: NAMESPACE_KEYS.patient,
                  id: searchParams.value,
                })}
              </FormErrorMessage>
            )}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSearchDialogOpen(false)}
              >
                {t(PATIENTS_KEYS.search.cancel, { ns: NAMESPACE_KEYS.patient })}
              </Button>
              <Button
                onClick={() => {
                  setSearchTriggered(true);
                  setNotFound(false);
                }}
                disabled={!searchParams.value}
              >
                {t(PATIENTS_KEYS.search.search, { ns: NAMESPACE_KEYS.patient })}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
