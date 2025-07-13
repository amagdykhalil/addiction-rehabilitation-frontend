import { useSearchParams } from "react-router-dom";
import { UserChangeEmailForm } from "@/features/user/ui/UserChangeEmailForm";
import { UserChangePasswordForm } from "@/features/user/ui/UserChangePasswordForm";
import { Mail, KeyRound, Bell } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/shared/ui/PageHeader";
import { USER_KEYS } from "@/entities/user/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";

const SETTINGS_TABS = [
  {
    key: "changeEmail",
    labelKey: USER_KEYS.settings.changeEmail,
    icon: Mail,
  },
  {
    key: "changePassword",
    labelKey: USER_KEYS.settings.changePassword,
    icon: KeyRound,
  },
  {
    key: "notifications",
    labelKey: USER_KEYS.settings.notifications,
    icon: Bell,
  },
] as const;

type TabKey = (typeof SETTINGS_TABS)[number]["key"];

export const UserSettingsPage = () => {
  const { t, ready } = useTranslation([
    NAMESPACE_KEYS.common,
    NAMESPACE_KEYS.auth,
    NAMESPACE_KEYS.user,
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get("tab");
  const selected: TabKey = SETTINGS_TABS.some((t) => t.key === raw)
    ? (raw as TabKey)
    : "changeEmail";

  const setSelected = (tab: TabKey) => {
    setSearchParams({ tab });
  };

  if (!ready) return null;

  return (
    <div className="mx-auto py-8 px-2 w-full">
      <PageHeader
        title={t(USER_KEYS.settings.title, { ns: NAMESPACE_KEYS.user })}
        subtitle={t(USER_KEYS.settings.subtitle, {
          ns: NAMESPACE_KEYS.user,
        })}
      />
      <div className="bg-white rounded-xl p-6 mt-6">
        {/* Tab Bar */}
        <div className="flex flex-wrap gap-2 border-b mb-8">
          {SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = selected === tab.key;
            return (
              <button
                key={tab.key}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer",
                  isActive
                    ? "border-violet-500 text-violet-600 bg-violet-50"
                    : "border-transparent text-muted-foreground hover:text-violet-600 hover:bg-violet-50"
                )}
                onClick={() => setSelected(tab.key)}
                type="button"
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="w-5 h-5" />
                <span>{t(tab.labelKey, { ns: NAMESPACE_KEYS.user })}</span>
              </button>
            );
          })}
        </div>
        {/* Tab Content */}
        <div className="mt-4">
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

export default UserSettingsPage;
