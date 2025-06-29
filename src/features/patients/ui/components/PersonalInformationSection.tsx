import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Label } from "@/shared/ui/label";
import { Card, CardContent } from "@/shared/ui/card";
import { CardHeaderWithTitle } from "@/shared/ui/cards/CardHeaderWithTitle";
import { CustomFormField } from "@/shared/ui";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { PATIENT_KEYS } from "@/entities/patients/lib/translationKeys";
import type { PatientFormData } from "../types";

export function PersonalInformationSection() {
  const { t } = useTranslation([NAMESPACE_KEYS.patient]);
  const form = useFormContext<PatientFormData>();

  return (
    <Card>
      <CardHeaderWithTitle
        title={t(PATIENT_KEYS.form.personalInformation, {
          ns: NAMESPACE_KEYS.patient,
        })}
        description={t(PATIENT_KEYS.form.basicDetails, {
          ns: NAMESPACE_KEYS.patient,
        })}
      />
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormField
            label={t(PATIENT_KEYS.form.firstName, {
              ns: NAMESPACE_KEYS.patient,
            })}
            name="FirstName"
            required
            inputProps={form.register("FirstName")}
            error={form.formState.errors.FirstName?.message}
          />
          <CustomFormField
            label={t(PATIENT_KEYS.form.secondName, {
              ns: NAMESPACE_KEYS.patient,
            })}
            name="SecondName"
            required
            inputProps={form.register("SecondName")}
            error={form.formState.errors.SecondName?.message}
          />
          <CustomFormField
            label={t(PATIENT_KEYS.form.thirdName, {
              ns: NAMESPACE_KEYS.patient,
            })}
            name="ThirdName"
            inputProps={form.register("ThirdName")}
            error={form.formState.errors.ThirdName?.message}
          />
          <CustomFormField
            label={t(PATIENT_KEYS.form.lastName, {
              ns: NAMESPACE_KEYS.patient,
            })}
            name="LastName"
            required
            inputProps={form.register("LastName")}
            error={form.formState.errors.LastName?.message}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              {t(PATIENT_KEYS.form.birthDate, { ns: NAMESPACE_KEYS.patient })}
              <span className="text-destructive">*</span>
            </Label>
            <Controller
              control={form.control}
              name="BirthDate"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      type="button"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value
                        ? format(new Date(field.value), "PPP")
                        : t(PATIENT_KEYS.form.pickDate, {
                            ns: NAMESPACE_KEYS.patient,
                          })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) =>
                        field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                      }
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {form.formState.errors.BirthDate && (
              <p className="text-sm text-destructive">
                {form.formState.errors.BirthDate.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              {t(PATIENT_KEYS.form.gender, { ns: NAMESPACE_KEYS.patient })}
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
                      {t(PATIENT_KEYS.form.male, {
                        ns: NAMESPACE_KEYS.patient,
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
                      {t(PATIENT_KEYS.form.female, {
                        ns: NAMESPACE_KEYS.patient,
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
