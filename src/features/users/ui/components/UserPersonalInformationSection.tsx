import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Label } from "@/shared/ui/label";
import { Card, CardContent } from "@/shared/ui/card";
import { CardHeaderWithTitle } from "@/shared/ui/cards/CardHeaderWithTitle";
import { CustomFormField } from "@/shared/ui";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import type { UserFormData } from "../types";

export function UserPersonalInformationSection({
  isEdit,
}: {
  isEdit: boolean;
}) {
  const { t } = useTranslation([NAMESPACE_KEYS.users]);
  const form = useFormContext<UserFormData>();

  return (
    <Card>
      <CardHeaderWithTitle
        title={t(USERS_KEYS.form.personalInformation, {
          ns: NAMESPACE_KEYS.users,
        })}
        description={t(USERS_KEYS.form.basicDetails, {
          ns: NAMESPACE_KEYS.users,
        })}
      />
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormField
            label={t(USERS_KEYS.form.firstName, {
              ns: NAMESPACE_KEYS.users,
            })}
            name="FirstName"
            required
            inputProps={form.register("FirstName")}
            error={form.formState.errors.FirstName?.message}
          />
          <CustomFormField
            label={t(USERS_KEYS.form.secondName, {
              ns: NAMESPACE_KEYS.users,
            })}
            name="SecondName"
            required
            inputProps={form.register("SecondName")}
            error={form.formState.errors.SecondName?.message}
          />
          <CustomFormField
            label={t(USERS_KEYS.form.thirdName, {
              ns: NAMESPACE_KEYS.users,
            })}
            name="ThirdName"
            inputProps={form.register("ThirdName")}
            error={form.formState.errors.ThirdName?.message}
          />
          <CustomFormField
            label={t(USERS_KEYS.form.lastName, {
              ns: NAMESPACE_KEYS.users,
            })}
            name="LastName"
            required
            inputProps={form.register("LastName")}
            error={form.formState.errors.LastName?.message}
          />
          {!isEdit && (
            <CustomFormField
              label={t(USERS_KEYS.form.email, { ns: NAMESPACE_KEYS.users })}
              name="Email"
              required
              type="email"
              inputProps={form.register("Email")}
              error={form.formState.errors.Email?.message}
            />
          )}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              {t(USERS_KEYS.form.gender, { ns: NAMESPACE_KEYS.users })}
              <span className="text-destructive">*</span>
            </Label>
            <Controller
              control={form.control}
              name="Gender"
              render={({ field }) => (
                <RadioGroup
                  value={String(field.value)}
                  onValueChange={(value) => field.onChange(Number(value))}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="0"
                      id="male"
                      className="cursor-pointer"
                    />
                    <Label htmlFor="male" className="cursor-pointer">
                      {t(USERS_KEYS.form.male, {
                        ns: NAMESPACE_KEYS.users,
                      })}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="1"
                      id="female"
                      className="cursor-pointer"
                    />
                    <Label htmlFor="female" className="cursor-pointer">
                      {t(USERS_KEYS.form.female, {
                        ns: NAMESPACE_KEYS.users,
                      })}
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {form.formState.errors.Gender && (
              <p className="text-sm text-destructive">
                {form.formState.errors.Gender.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
