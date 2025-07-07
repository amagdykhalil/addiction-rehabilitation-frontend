import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import type { Patient } from "@/entities/patients/model";
import { Phone, MapPin, IdCard } from "lucide-react";
import { Phone, MapPin, IdCard } from "lucide-react";

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
          {t(PATIENTS_KEYS.details.contactAndId, {
            ns: NAMESPACE_KEYS.patient,
          })}
          {t(PATIENTS_KEYS.details.contactAndId, {
            ns: NAMESPACE_KEYS.patient,
          })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENTS_KEYS.details.phoneNumber, {
                {t(PATIENTS_KEYS.details.phoneNumber, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </label>
              <p className="text-sm">{patient.callPhoneNumber}</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">
                {t(PATIENTS_KEYS.details.nationality, {
                {t(PATIENTS_KEYS.details.nationality, {
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
              <div className="flex items-center gap-2">
                <IdCard className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <IdCard className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium text-muted-foreground">
                  {t(PATIENTS_KEYS.details.nationalIdNumber, {
                  {t(PATIENTS_KEYS.details.nationalIdNumber, {
                    ns: NAMESPACE_KEYS.patient,
                  })}
                </label>
                <p className="text-sm font-mono">{patient.nationalIdNumber}</p>
              </div>
            )}
            {patient.passportNumber && (
              <div className="flex items-center gap-2">
                <IdCard className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <IdCard className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium text-muted-foreground">
                  {t(PATIENTS_KEYS.details.passportNumber, {
                  {t(PATIENTS_KEYS.details.passportNumber, {
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
