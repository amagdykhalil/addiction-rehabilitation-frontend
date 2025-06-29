import { useCurrentLanguage } from "@/shared/hooks/useCurrentLanguage";
import { Toaster } from "../../shared/ui/sonner";

export const ToasterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { dir } = useCurrentLanguage();

  return (
    <>
      <Toaster position="top-center" richColors theme="light" dir={dir} />
      {children}
    </>
  );
};
