import {
  Bell as IconBell,
  KeyRound as IconKey,
  Mail as IconMail,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { USER_KEYS } from "@/entities/user/lib/translationKeys";
type SectionKey = "changeEmail" | "changePassword" | "notifications";

interface Section {
  key: SectionKey;
  icon: React.ElementType;
  label: string;
}

const SECTIONS: Section[] = [
  { key: "changeEmail", icon: IconMail, label: USER_KEYS.settings.changeEmail },
  {
    key: "changePassword",
    icon: IconKey,
    label: USER_KEYS.settings.changePassword,
  },
  {
    key: "notifications",
    icon: IconBell,
    label: USER_KEYS.settings.notifications,
  },
];

type SettingsSidebarProps = {
  selected: SectionKey;
  setSelected: (s: SectionKey) => void;
};

export const SettingsSidebar = ({
  selected,
  setSelected,
}: SettingsSidebarProps) => {
  const { t } = useTranslation([
    NAMESPACE_KEYS.sidebar,
    NAMESPACE_KEYS.common,
    NAMESPACE_KEYS.auth,
  ]);

  return (
    <aside
      className={`min-w-[220px] max-w-[260px] bg-white flex flex-col gap-1`}
    >
      {SECTIONS.map((section) => {
        const Icon = section.icon;
        return (
          <button
            key={section.key}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sm transition text-left mb-1 cursor-pointer
              ${
                selected === section.key
                  ? "bg-blue-100 text-blue-600"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }
            `}
            onClick={() => setSelected(section.key)}
            type="button"
          >
            <Icon className="w-5 h-5" />
            {t(section.label, { ns: NAMESPACE_KEYS.user })}
          </button>
        );
      })}
    </aside>
  );
};
