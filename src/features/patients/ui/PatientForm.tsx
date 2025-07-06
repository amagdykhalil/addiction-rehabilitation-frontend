"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useGetPatient } from "@/features/patients/hooks/useGetPatient";
import { FormActions } from "@/shared/ui/form/FormActions";
import { PatientPersonalInformationSection } from "./components/PatientPersonalInformationSection";
import { PatientContactSection } from "./components/PatientContactSection";
import { PatientAdditionalInformationSection } from "./components/PatientAdditionalInformationSection";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import { COMMON_KEYS } from "@/shared/i18n/keys/commonKeys";
import { createPatientFormSchema, type PatientFormProps } from "./types";
import {
  createPatientFormDefaultValues,
  resetFormWithPatientData,
} from "./utils/formUtils";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { useCurrentLanguage } from "@/shared/hooks/useCurrentLanguage";

export function PatientForm({
  patientId,
  onSubmit,
  isLoading,
}: PatientFormProps) {
  const { t } = useTranslation([
    NAMESPACE_KEYS.common,
    NAMESPACE_KEYS.patient,
    NAMESPACE_KEYS.validator,
  ]);

  const {
    patient,
    isLoading: isPatientLoading,
    error: patientError,
  } = useGetPatient(patientId || "");

  const PatientFormSchema = createPatientFormSchema(t);
  const { isArabic } = useCurrentLanguage();
  const form = useForm({
    resolver: zodResolver(PatientFormSchema),
    defaultValues: createPatientFormDefaultValues(patient),
  });

  // Error detection functions for each tab
  const hasPersonalErrors = () => {
    const errors = form.formState.errors;
    return !!(
      errors.FirstName ||
      errors.SecondName ||
      errors.ThirdName ||
      errors.LastName ||
      errors.BirthDate ||
      errors.Gender
    );
  };

  const hasContactErrors = () => {
    const errors = form.formState.errors;
    return !!(
      errors.CallPhoneNumber ||
      errors.NationalIdNumber ||
      errors.PassportNumber ||
      errors.NationalityId ||
      errors.idDocumentType
    );
  };

  const hasAdditionalErrors = () => {
    const errors = form.formState.errors;
    return !!errors.PersonalImageURL;
  };

  useEffect(() => {
    resetFormWithPatientData(form, patient);
  }, [patient, form]);

  if (isPatientLoading) {
    return <div>{t(COMMON_KEYS.loading, { ns: NAMESPACE_KEYS.common })}</div>;
  }

  if (patientError) {
    return (
      <div>
        {t(COMMON_KEYS.error, { ns: NAMESPACE_KEYS.common })}:{" "}
        {patientError.message}
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList
            className={`flex flex-col w-full h-auto ${isArabic ? "md:flex-row-reverse" : "md:flex-row"}`}
          >
            <TabsTrigger
              value="personal"
              className={cn(
                "w-full md:w-auto relative",
                hasPersonalErrors() && "text-destructive border-destructive",
              )}
            >
              {t(PATIENTS_KEYS.form.personalInfo, {
                ns: NAMESPACE_KEYS.patient,
              })}
              {hasPersonalErrors() && (
                <AlertCircle className="h-4 w-4 ml-2 text-destructive" />
              )}
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className={cn(
                "w-full md:w-auto relative",
                hasContactErrors() && "text-destructive border-destructive",
              )}
            >
              {t(PATIENTS_KEYS.form.contactAndId, {
                ns: NAMESPACE_KEYS.patient,
              })}
              {hasContactErrors() && (
                <AlertCircle className="h-4 w-4 ml-2 text-destructive" />
              )}
            </TabsTrigger>
            <TabsTrigger
              value="additional"
              className={cn(
                "w-full md:w-auto relative",
                hasAdditionalErrors() && "text-destructive border-destructive",
              )}
            >
              {t(PATIENTS_KEYS.form.additionalInfo, {
                ns: NAMESPACE_KEYS.patient,
              })}
              {hasAdditionalErrors() && (
                <AlertCircle className="h-4 w-4 ml-2 text-destructive" />
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <PatientPersonalInformationSection />
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <PatientContactSection patient={patient || undefined} />
          </TabsContent>

          <TabsContent value="additional" className="space-y-4">
            <PatientAdditionalInformationSection />
          </TabsContent>
        </Tabs>

        <FormActions
          isLoading={isLoading || form.formState.isSubmitting}
          submitText={
            patientId
              ? t(PATIENTS_KEYS.form.updatePatient, {
                  ns: NAMESPACE_KEYS.patient,
                })
              : t(PATIENTS_KEYS.form.addPatient, { ns: NAMESPACE_KEYS.patient })
          }
          cancelText={t(COMMON_KEYS.cancel.button, {
            ns: NAMESPACE_KEYS.common,
          })}
        />
      </form>
    </FormProvider>
  );
}
