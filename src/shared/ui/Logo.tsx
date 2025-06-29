import { LogoIcon } from "@/shared/ui/LogoIcon";

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2 w-full">
      <LogoIcon />

      <span className="font-bold text-xl text-foreground transition-all duration-200">
        ARC
      </span>
    </div>
  );
};
