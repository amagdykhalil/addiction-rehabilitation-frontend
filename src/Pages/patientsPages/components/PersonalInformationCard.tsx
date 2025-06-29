import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { PATIENT_KEYS } from "@/entities/patients/lib/translationKeys";
import { getAge } from "@/shared/lib/utils";
import { formatDate } from "@/shared/lib/date";
import type { Patient } from "@/entities/patients/model";

interface PersonalInformationCardProps {
  patient: Patient;
}

export function PersonalInformationCard({
  patient,
}: PersonalInformationCardProps) {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.patient]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t(PATIENT_KEYS.details.personalInfo, { ns: NAMESPACE_KEYS.patient })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENT_KEYS.details.firstName, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">{patient.firstName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENT_KEYS.details.secondName, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">{patient.secondName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENT_KEYS.details.thirdName, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">{patient.thirdName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENT_KEYS.details.lastName, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">{patient.lastName}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENT_KEYS.details.fullName, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">
                {patient.firstName} {patient.lastName}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENT_KEYS.details.birthDate, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">{formatDate(patient.birthDate)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENT_KEYS.details.gender, { ns: NAMESPACE_KEYS.patient })}
              </label>
              <p className="text-sm">
                {patient.gender === 0
                  ? t(PATIENT_KEYS.gender.male, { ns: NAMESPACE_KEYS.patient })
                  : t(PATIENT_KEYS.gender.female, {
                      ns: NAMESPACE_KEYS.patient,
                    })}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENT_KEYS.details.age, { ns: NAMESPACE_KEYS.patient })}
              </label>
              <p className="text-sm">
                {getAge(patient.birthDate)}{" "}
                {t(PATIENT_KEYS.details.years, { ns: NAMESPACE_KEYS.patient })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
