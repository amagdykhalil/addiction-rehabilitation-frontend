import { useSearchParams } from "react-router-dom";
import { UserChangeEmailForm } from "@/features/user/ui/UserChangeEmailForm";
import { UserChangePasswordForm } from "@/features/user/ui/UserChangePasswordForm";
import { SettingsSidebar } from "@/features/user/ui/SettingsSidebar";
import {
  SECTION_KEYS,
  type SectionKey,
} from "@/features/patients/models/types";

export const UserSettingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const raw = searchParams.get("section");
  const selected: SectionKey = SECTION_KEYS.includes(raw as SectionKey)
    ? (raw as SectionKey)
    : "changeEmail";

  const setSelected = (section: SectionKey) => {
    setSearchParams({ section });
  };

  return (
    <div className="flex gap-8 mx-auto py-8">
      <SettingsSidebar selected={selected} setSelected={setSelected} />
      <div className="flex-1 order-1">
        <div className="space-y-6">
          {selected === "changeEmail" && <UserChangeEmailForm />}
          {selected === "changePassword" && <UserChangePasswordForm />}
          {selected === "notifications" && (
            <div className="p-6 border rounded-lg bg-background">
              <h2 className="text-lg font-semibold mb-2">Notifications</h2>
              <p className="text-muted-foreground mb-4">
                Manage your notification preferences here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
