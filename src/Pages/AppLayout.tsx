import { AppSidebar } from "@/widgets/sidebar";
import { useCurrentLanguage } from "@/shared/hooks/useCurrentLanguage";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { Header } from "@/widgets/header/Header";
import { useAuth } from "@/entities/auth/model/useAuth";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { dir, isArabic } = useCurrentLanguage();
  const { isAuthenticated } = useAuth();
  return (
    <SidebarProvider className="w-full">
      {!isArabic && <AppSidebar />}
      <SidebarInset
        className={`${isAuthenticated && "m-2 ml-0 px-6"} flex flex-col overflow-hidden `}
      >
        <Header />
        {isAuthenticated ? (
          <main className="py-6 h-full" dir={dir}>
            {children}
          </main>
        ) : (
          <main className=" bg-gray-50 h-full" dir={dir}>
            {children}
          </main>
        )}
      </SidebarInset>
      {isArabic && <AppSidebar />}
    </SidebarProvider>
  );
};
