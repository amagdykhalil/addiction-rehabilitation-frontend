import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Label } from "@/shared/ui/label";
import { Card, CardContent } from "@/shared/ui/card";
import { CardHeaderWithTitle } from "@/shared/ui/cards/CardHeaderWithTitle";
import { CustomFormField } from "@/shared/ui";
import { CountrySelect } from "@/shared/ui/SelectCountry";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { PATIENT_KEYS } from "@/entities/patients/lib/translationKeys";
import { useGetCountries } from "@/features/countries/hooks/useGetCountries";
import type { Patient } from "@/entities/patients/model";
import type { PatientFormData } from "../types";

interface ContactAndIdentificationSectionProps {
  patient?: Patient;
}

export function ContactAndIdentificationSection({
  patient,
}: ContactAndIdentificationSectionProps) {
  const { t } = useTranslation([NAMESPACE_KEYS.patient]);
  const form = useFormContext<PatientFormData>();
  const { countries } = useGetCountries();

  return (
    <Card>
      <CardHeaderWithTitle
        title={t(PATIENT_KEYS.form.contactAndIdentification, {
          ns: NAMESPACE_KEYS.patient,
        })}
        description={t(PATIENT_KEYS.form.contactDetails, {
          ns: NAMESPACE_KEYS.patient,
        })}
      />
      <CardContent className="space-y-4">
        <CustomFormField
          label={t(PATIENT_KEYS.form.phoneNumber, {
            ns: NAMESPACE_KEYS.patient,
          })}
          name="CallPhoneNumber"
          type="tel"
          placeholder="01012345678"
          required
          inputProps={form.register("CallPhoneNumber")}
          error={form.formState.errors.CallPhoneNumber?.message}
        />

        <div className="space-y-4">
          <Label>
            {t(PATIENT_KEYS.form.identificationDocument, {
              ns: NAMESPACE_KEYS.patient,
            })}
          </Label>
          <Controller
            control={form.control}
            name="idDocumentType"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={(type) => {
                  field.onChange(type);
                  if (type === "national") {
                    form.setValue("PassportNumber", undefined);
                    if (patient?.nationalIdNumber) {
                      form.setValue(
                        "NationalIdNumber",
                        patient.nationalIdNumber,
                      );
                    } else {
                      form.setValue("NationalIdNumber", undefined);
                    }
                  } else {
                    form.setValue("NationalIdNumber", undefined);
                    if (patient?.passportNumber) {
                      form.setValue("PassportNumber", patient.passportNumber);
                    } else {
                      form.setValue("PassportNumber", undefined);
                    }
                  }
                }}
                className="flex space-x-4 mt-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="national" id="national" />
                  <Label htmlFor="national">
                    {t(PATIENT_KEYS.form.nationalId, {
                      ns: NAMESPACE_KEYS.patient,
                    })}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="passport" id="passport" />
                  <Label htmlFor="passport">
                    {t(PATIENT_KEYS.form.passport, {
                      ns: NAMESPACE_KEYS.patient,
                    })}
                  </Label>
                </div>
              </RadioGroup>
            )}
          />

          {form.watch("idDocumentType") === "national" ? (
            <CustomFormField
              label={t(PATIENT_KEYS.form.nationalIdNumber, {
                ns: NAMESPACE_KEYS.patient,
              })}
              name="NationalIdNumber"
              placeholder="12345678901234"
              required
              inputProps={form.register("NationalIdNumber")}
              error={form.formState.errors.NationalIdNumber?.message}
            />
          ) : (
            <CustomFormField
              label={t(PATIENT_KEYS.form.passportNumber, {
                ns: NAMESPACE_KEYS.patient,
              })}
              name="PassportNumber"
              placeholder="A123456"
              required
              inputProps={form.register("PassportNumber")}
              error={form.formState.errors.PassportNumber?.message}
            />
          )}

          {/* Global identification error */}
          {form.formState.errors.idDocumentType?.message && (
            <p className="text-sm text-destructive mt-2">
              {form.formState.errors.idDocumentType.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            {t(PATIENT_KEYS.form.nationality, { ns: NAMESPACE_KEYS.patient })}
            <span className="text-destructive">*</span>
          </Label>
          <Controller
            control={form.control}
            name="NationalityId"
            render={({ field }) => (
              <CountrySelect
                value={field.value}
                className="w-full mt-2"
                onSelectCountry={(value) => {
                  const country = countries.find((c) => c.id === value);
                  field.onChange(value);
                  form.setValue("NationalityName", country?.name || "");
                }}
                placeholder={t(PATIENT_KEYS.form.selectNationality, {
                  ns: NAMESPACE_KEYS.patient,
                })}
              />
            )}
          />
          {form.formState.errors.NationalityId && (
            <p className="text-sm text-destructive">
              {form.formState.errors.NationalityId.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
