import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/separator";
import { Calendar, Phone, MapPin, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import { getAge } from "@/shared/lib/utils";
import type { Patient } from "@/entities/patients/model";

interface PatientProfileCardProps {
  patient: Patient;
}

export function PatientProfileCard({ patient }: PatientProfileCardProps) {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.patient]);

  return (
    <Card className="lg:col-span-1">
      <CardHeader className="text-center">
        <Avatar className="h-32 w-32 mx-auto mb-4">
          <AvatarImage
            src={patient.personalImageURL || "/placeholder.svg"}
            alt={patient.firstName + " " + patient.lastName}
          />
          <AvatarFallback className="text-2xl">
            {patient.firstName.charAt(0)}
            {patient.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl">
          {patient.firstName} {patient.lastName}
        </CardTitle>
        <CardDescription>
          {t(PATIENTS_KEYS.details.patientId, { ns: NAMESPACE_KEYS.patient })}:{" "}
          {patient.id}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <Badge
            variant={patient.gender === 0 ? "default" : "secondary"}
            className="text-sm"
          >
            {patient.gender === 0
              ? t(PATIENTS_KEYS.gender.male, { ns: NAMESPACE_KEYS.patient })
              : t(PATIENTS_KEYS.gender.female, { ns: NAMESPACE_KEYS.patient })}
          </Badge>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">
                {t(PATIENTS_KEYS.details.age, { ns: NAMESPACE_KEYS.patient })}
              </div>
              <div className="text-sm text-muted-foreground">
                {getAge(patient.birthDate)}{" "}
                {t(PATIENTS_KEYS.details.yearsOld, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">
                {t(PATIENTS_KEYS.details.phone, { ns: NAMESPACE_KEYS.patient })}
              </div>
              <div className="text-sm text-muted-foreground">
                {patient.callPhoneNumber}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">
                {t(PATIENTS_KEYS.details.nationality, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                {patient.nationalityName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">
                {t(PATIENTS_KEYS.details.idDocument, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                {patient.nationalIdNumber ? (
                  <>
                    {t(PATIENTS_KEYS.details.nationalId, {
                      ns: NAMESPACE_KEYS.patient,
                    })}
                    : {patient.nationalIdNumber}
                  </>
                ) : patient.passportNumber ? (
                  <>
                    {t(PATIENTS_KEYS.details.passport, {
                      ns: NAMESPACE_KEYS.patient,
                    })}
                    : {patient.passportNumber}
                  </>
                ) : (
                  t(PATIENTS_KEYS.details.notProvided, {
                    ns: NAMESPACE_KEYS.patient,
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
