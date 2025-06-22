import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/stores";
import { setCredentials, logout } from "@/entities/auth/model/authSlice";
import type { IAuthenticationResponse } from "@/entities/auth/model";
import { isAuthExpired } from "@/shared/lib/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state: RootState) => state.authSlice.authData);

  const handleSetCredentials = (data: IAuthenticationResponse) => {
    dispatch(setCredentials(data));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const isAuthenticated: boolean = authData ? !isAuthExpired(authData) : false;
  return {
    authData,
    setCredentials: handleSetCredentials,
    logout: handleLogout,
    isAuthenticated,
  };
};
