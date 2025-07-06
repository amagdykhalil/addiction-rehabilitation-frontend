import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { FormActions } from "@/shared/ui/form/FormActions";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { COMMON_KEYS } from "@/shared/i18n/keys/commonKeys";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import useGetUser from "../hooks/useGetUser";
import { createUserFormSchema, type UserFormProps } from "./types";
import {
  createUserFormDefaultValues,
  resetFormWithUserData,
} from "./utils/formUtils";

import {
  UserAdditionalInformationSection,
  UserContactSection,
  UserPersonalInformationSection,
} from "./components";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { useCurrentLanguage } from "@/shared/hooks/useCurrentLanguage";

export function UserForm({ userId, onSubmit, isLoading }: UserFormProps) {
  const { t } = useTranslation([
    NAMESPACE_KEYS.common,
    NAMESPACE_KEYS.users,
    NAMESPACE_KEYS.validator,
  ]);

  const {
    user,
    isLoading: isUserLoading,
    error: UserError,
  } = useGetUser(userId || "");

  const isEdit = !!userId;
  console.log("isEdit: " + isEdit);
  const userFormSchema = createUserFormSchema(t, isEdit);
  const { isArabic } = useCurrentLanguage();
  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: createUserFormDefaultValues(user),
  });

  // Error detection functions for each tab
  const hasPersonalErrors = () => {
    const errors = form.formState.errors;
    return !!(
      errors.FirstName ||
      errors.SecondName ||
      errors.ThirdName ||
      errors.LastName ||
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

  console.log(form.formState.errors);
  useEffect(() => {
    resetFormWithUserData(form, user);
  }, [user, form]);

  if (isUserLoading) {
    return <div>{t(COMMON_KEYS.loading, { ns: NAMESPACE_KEYS.common })}</div>;
  }

  if (UserError) {
    return (
      <div>
        {t(COMMON_KEYS.error, { ns: NAMESPACE_KEYS.common })}:{" "}
        {UserError.message}
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
              {t(USERS_KEYS.form.personalInfo, {
                ns: NAMESPACE_KEYS.users,
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
              {t(USERS_KEYS.form.contactAndId, {
                ns: NAMESPACE_KEYS.users,
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
              {t(USERS_KEYS.form.additionalInfo, {
                ns: NAMESPACE_KEYS.users,
              })}
              {hasAdditionalErrors() && (
                <AlertCircle className="h-4 w-4 ml-2 text-destructive" />
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <UserPersonalInformationSection isEdit={isEdit} />
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <UserContactSection user={user || undefined} />
          </TabsContent>

          <TabsContent value="additional" className="space-y-4">
            <UserAdditionalInformationSection isEdit={isEdit} />
          </TabsContent>
        </Tabs>

        <FormActions
          isLoading={isLoading || form.formState.isSubmitting}
          submitText={
            userId
              ? t(USERS_KEYS.form.updateUser, {
                  ns: NAMESPACE_KEYS.users,
                })
              : t(USERS_KEYS.form.addUser, { ns: NAMESPACE_KEYS.users })
          }
          cancelText={t(COMMON_KEYS.cancel.button, {
            ns: NAMESPACE_KEYS.common,
          })}
        />
      </form>
    </FormProvider>
  );
}
