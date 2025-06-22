import { Link } from "react-router-dom";

interface LogoProps {
  isAuthenticated: boolean;
}

export const Logo = ({ isAuthenticated }: LogoProps) => (
  <Link
    to={isAuthenticated ? "/dashboard" : "/"}
    className="flex items-center space-x-2"
  >
    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-lg">A</span>
    </div>
    <span className="font-bold text-xl text-foreground">AppName</span>
  </Link>
);
