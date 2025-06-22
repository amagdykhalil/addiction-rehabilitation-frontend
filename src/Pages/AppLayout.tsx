import { Header } from "@/widgets/header/Header";
import { Footer } from "@/widgets/footer/Footer";
import { useCurrentLanguage } from "@/shared/hooks/useCurrentLanguage";
import { useAuth } from "@/entities/auth/model/useAuth";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { dir } = useCurrentLanguage();
  const { isAuthenticated } = useAuth();
  return (
    <div dir={dir} className="flex flex-col min-h-screen">
      <Header isAuthenticated={isAuthenticated} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
