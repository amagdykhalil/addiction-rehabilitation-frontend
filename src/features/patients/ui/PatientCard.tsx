import type { Patient } from "@/entities/patients/model";
import { getAge } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useTranslation } from "react-i18next";
import { COMMON_KEYS, NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import { PatientMenuAction } from "./PatientMenuAction";

export const PatientCard = ({ patient }: { patient: Patient }) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.patient]);

  return (
    <Card className="mb-4 p-4 border rounded-lg shadow-sm">
      <CardContent className="p-0">
        {/* Header: avatar + name */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={patient.personalImageURL || "/placeholder.svg"} />
            <AvatarFallback>
              {patient.firstName?.charAt(0) ?? ""}
              {patient.lastName?.charAt(0) ?? ""}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">
              {[
                patient.firstName,
                patient.secondName,
                patient.thirdName,
                patient.lastName,
              ]
                .filter(Boolean)
                .join(" ")}
            </h3>
            <p className="text-xs text-muted-foreground font-mono truncate">
              {t(PATIENTS_KEYS.details.patientId, {
                ns: NAMESPACE_KEYS.patient,
              })}
              : {patient.id}
            </p>
          </div>
          {/* Actions */}
          <PatientMenuAction id={patient.id} patient={patient} />
        </div>
        {/* Details grid */}
        <div className="space-y-2">
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(PATIENTS_KEYS.details.age, { ns: NAMESPACE_KEYS.patient })}:
            </span>
            <span>
              {getAge(patient.birthDate)}{" "}
              {t(PATIENTS_KEYS.details.years, { ns: NAMESPACE_KEYS.patient })}
            </span>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(PATIENTS_KEYS.details.gender, { ns: NAMESPACE_KEYS.patient })}:
            </span>
            <span>
              {patient.gender === 0
                ? t(COMMON_KEYS.gender.male, {
                    ns: NAMESPACE_KEYS.common,
                  })
                : t(COMMON_KEYS.gender.female, {
                    ns: NAMESPACE_KEYS.common,
                  })}
            </span>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(PATIENTS_KEYS.details.phone, { ns: NAMESPACE_KEYS.patient })}:
            </span>
            <span className="text-sm truncate">{patient.callPhoneNumber}</span>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {patient.nationalIdNumber
                ? `${t(PATIENTS_KEYS.table.nationalId, { ns: NAMESPACE_KEYS.patient })}: `
                : patient.passportNumber
                  ? `${t(PATIENTS_KEYS.table.passport, { ns: NAMESPACE_KEYS.patient })}: `
                  : t(PATIENTS_KEYS.details.notProvided, {
                      ns: NAMESPACE_KEYS.patient,
                    })}
            </span>
            <span className="text-sm font-mono truncate">
              {patient.nationalIdNumber
                ? `${patient.nationalIdNumber}`
                : patient.passportNumber
                  ? `${patient.passportNumber}`
                  : ""}
            </span>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(PATIENTS_KEYS.details.nationality, {
                ns: NAMESPACE_KEYS.patient,
              })}
              :
            </span>
            <span className="text-sm truncate">{patient.nationalityName}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
