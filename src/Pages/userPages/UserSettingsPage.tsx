import { generatePath, useNavigate } from "react-router-dom";
import { USER_ROUTES } from "@/entities/user/routes/userRoutePaths";

export const UserSettingsPage = () => {
  const navigate = useNavigate();

  const goToProfile = (userId: string) => {
    const url = generatePath(USER_ROUTES.PROFILE, { userId });
    navigate(url);
  };

  return (
    <div>
      <button onClick={() => goToProfile("123")}>View Profile</button>
    </div>
  );
};
