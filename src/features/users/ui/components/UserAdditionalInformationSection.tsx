import { useTranslation } from "react-i18next";
import { Upload } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { CardHeaderWithTitle } from "@/shared/ui/cards/CardHeaderWithTitle";
import { CustomFormField } from "@/shared/ui";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { useFormContext } from "react-hook-form";
import type { UserFormData } from "@/features/users/models/types";
import { UserRolesSelect } from "./UserRolesSelect";

export function UserAdditionalInformationSection({
  isEdit,
}: {
  isEdit: boolean;
}) {
  const { t } = useTranslation([NAMESPACE_KEYS.users]);
  const form = useFormContext<UserFormData>();
  console.log("isEdit: " + isEdit);
  return (
    <Card>
      <CardHeaderWithTitle
        title={t(USERS_KEYS.form.additionalInformation, {
          ns: NAMESPACE_KEYS.users,
        })}
        description={t(USERS_KEYS.form.optionalInfo, {
          ns: NAMESPACE_KEYS.users,
        })}
      />
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <CustomFormField
              label={t(USERS_KEYS.form.profileImageUrl, {
                ns: NAMESPACE_KEYS.users,
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
              {t(USERS_KEYS.form.upload, {
                ns: NAMESPACE_KEYS.users,
              })}
            </Button>
          </div>
        </div>

        {/* Roles selection (only on create) */}
        {!isEdit && <UserRolesSelect />}
      </CardContent>
    </Card>
  );
}
