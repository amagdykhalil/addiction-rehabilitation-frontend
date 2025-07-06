import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Label } from "@/shared/ui/label";
import { Card, CardContent } from "@/shared/ui/card";
import { CardHeaderWithTitle } from "@/shared/ui/cards/CardHeaderWithTitle";
import { CustomFormField } from "@/shared/ui";
import { CountrySelect } from "@/shared/ui/SelectCountry";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { useGetCountries } from "@/features/countries/hooks/useGetCountries";
import type { UserFormData } from "../types";
import type { User } from "@/entities/users/model";

interface UserContactSectionProps {
  user?: User;
}

export function UserContactSection({ user }: UserContactSectionProps) {
  const { t } = useTranslation([NAMESPACE_KEYS.users]);
  const form = useFormContext<UserFormData>();
  const { countries } = useGetCountries();

  return (
    <Card>
      <CardHeaderWithTitle
        title={t(USERS_KEYS.form.contactAndIdentification, {
          ns: NAMESPACE_KEYS.users,
        })}
        description={t(USERS_KEYS.form.contactDetails, {
          ns: NAMESPACE_KEYS.users,
        })}
      />
      <CardContent className="space-y-4">
        <CustomFormField
          label={t(USERS_KEYS.form.phoneNumber, {
            ns: NAMESPACE_KEYS.users,
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
            {t(USERS_KEYS.form.identificationDocument, {
              ns: NAMESPACE_KEYS.users,
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
                    if (user?.nationalIdNumber) {
                      form.setValue("NationalIdNumber", user.nationalIdNumber);
                    } else {
                      form.setValue("NationalIdNumber", undefined);
                    }
                  } else {
                    form.setValue("NationalIdNumber", undefined);
                    if (user?.passportNumber) {
                      form.setValue("PassportNumber", user.passportNumber);
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
                    {t(USERS_KEYS.form.nationalId, {
                      ns: NAMESPACE_KEYS.users,
                    })}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="passport" id="passport" />
                  <Label htmlFor="passport">
                    {t(USERS_KEYS.form.passport, {
                      ns: NAMESPACE_KEYS.users,
                    })}
                  </Label>
                </div>
              </RadioGroup>
            )}
          />

          {form.watch("idDocumentType") === "national" ? (
            <CustomFormField
              label={t(USERS_KEYS.form.nationalIdNumber, {
                ns: NAMESPACE_KEYS.users,
              })}
              name="NationalIdNumber"
              placeholder="12345678901234"
              required
              inputProps={form.register("NationalIdNumber")}
              error={form.formState.errors.NationalIdNumber?.message}
            />
          ) : (
            <CustomFormField
              label={t(USERS_KEYS.form.passportNumber, {
                ns: NAMESPACE_KEYS.users,
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
            {t(USERS_KEYS.form.nationality, { ns: NAMESPACE_KEYS.users })}
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
                placeholder={t(USERS_KEYS.form.selectNationality, {
                  ns: NAMESPACE_KEYS.users,
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
