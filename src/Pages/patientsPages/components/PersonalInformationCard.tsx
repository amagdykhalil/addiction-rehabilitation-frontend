import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import { getAge } from "@/shared/lib/utils";
import { formatDate } from "@/shared/lib/date";
import type { Patient } from "@/entities/patients/model";
import {
  User as UserIcon,
  UserCircle,
  Calendar,
  Venus,
  Mars,
  Hash,
} from "lucide-react";

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
          {t(PATIENTS_KEYS.details.personalInfo, {
            ns: NAMESPACE_KEYS.patient,
          })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENTS_KEYS.details.firstName, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">{patient.firstName}</p>
            </div>
            <div className="flex items-center gap-2">
              <UserCircle className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENTS_KEYS.details.secondName, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">{patient.secondName}</p>
            </div>
            <div className="flex items-center gap-2">
              <UserCircle className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENTS_KEYS.details.thirdName, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">{patient.thirdName}</p>
            </div>
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENTS_KEYS.details.lastName, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">{patient.lastName}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENTS_KEYS.details.fullName, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">
                {patient.firstName} {patient.lastName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENTS_KEYS.details.birthDate, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">{formatDate(patient.birthDate)}</p>
            </div>
            <div className="flex items-center gap-2">
              {patient.gender === 0 ? (
                <Mars className="h-4 w-4 text-blue-500" />
              ) : (
                <Venus className="h-4 w-4 text-pink-500" />
              )}
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENTS_KEYS.details.gender, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">
                {patient.gender === 0
                  ? t(PATIENTS_KEYS.gender.male, { ns: NAMESPACE_KEYS.patient })
                  : t(PATIENTS_KEYS.gender.female, {
                      ns: NAMESPACE_KEYS.patient,
                    })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENTS_KEYS.details.age, { ns: NAMESPACE_KEYS.patient })}
              </label>
              <p className="text-sm">
                {getAge(patient.birthDate)}{" "}
                {t(PATIENTS_KEYS.details.years, { ns: NAMESPACE_KEYS.patient })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
