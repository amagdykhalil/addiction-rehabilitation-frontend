import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { PATIENT_KEYS } from "@/entities/patients/lib/translationKeys";
import type { Patient } from "@/entities/patients/model";

interface ContactAndIdentificationCardProps {
  patient: Patient;
}

export function ContactAndIdentificationCard({
  patient,
}: ContactAndIdentificationCardProps) {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.patient]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t(PATIENT_KEYS.details.contactAndId, { ns: NAMESPACE_KEYS.patient })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENT_KEYS.details.phoneNumber, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">{patient.callPhoneNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENT_KEYS.details.nationality, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">
                {patient.nationalityName} ({patient.nationalityId})
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {patient.nationalIdNumber && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {t(PATIENT_KEYS.details.nationalIdNumber, {
                    ns: NAMESPACE_KEYS.patient,
                  })}
                </label>
                <p className="text-sm font-mono">{patient.nationalIdNumber}</p>
              </div>
            )}
            {patient.passportNumber && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {t(PATIENT_KEYS.details.passportNumber, {
                    ns: NAMESPACE_KEYS.patient,
                  })}
                </label>
                <p className="text-sm font-mono">{patient.passportNumber}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
