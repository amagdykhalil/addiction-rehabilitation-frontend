import { useTranslation } from "react-i18next";
import { Upload } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { CardHeaderWithTitle } from "@/shared/ui/cards/CardHeaderWithTitle";
import { CustomFormField } from "@/shared/ui";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import type { PatientFormData } from "../types";
import { useFormContext } from "react-hook-form";

export function PatientAdditionalInformationSection() {
  const { t } = useTranslation([NAMESPACE_KEYS.patient]);
  const form = useFormContext<PatientFormData>();

  return (
    <Card>
      <CardHeaderWithTitle
        title={t(PATIENTS_KEYS.form.additionalInformation, {
          ns: NAMESPACE_KEYS.patient,
        })}
        description={t(PATIENTS_KEYS.form.optionalInfo, {
          ns: NAMESPACE_KEYS.patient,
        })}
      />
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <CustomFormField
              label={t(PATIENTS_KEYS.form.profileImageUrl, {
                ns: NAMESPACE_KEYS.patient,
              })}
              name="PersonalImageURL"
              type="url"
              placeholder="https://example.com/image.jpg"
              inputProps={form.register("PersonalImageURL")}
              error={form.formState.errors.PersonalImageURL?.message}
              className="flex-1"
            />
            <Button type="button" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              {t(PATIENTS_KEYS.form.upload, {
                ns: NAMESPACE_KEYS.patient,
              })}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
