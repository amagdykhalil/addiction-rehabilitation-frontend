import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useTranslation } from 'react-i18next';
import type { RootState } from "@/app/stores";
import { ROUTES } from "@/shared/routes";

export const Footer: React.FC = () => {
  // const { t } = useTranslation();
  const authData = useSelector((state: RootState) => state.authSlice.authData);

  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        {authData ? (
          <div>{/* <p>{t('common:footer.loggedInContent')}</p> */}</div>
        ) : (
          <div>
            {/* <p>{t('common:footer.loggedOutContent')}</p> */}
            <Link to={ROUTES.LOGIN} className="text-blue-400 hover:underline">
              {/* {t('common:footer.loginPrompt')} */}
            </Link>
          </div>
        )}
        {/* <p>&copy; {new Date().getFullYear()} {t('common:appName')}. All rights reserved.</p> */}
      </div>
    </footer>
  );
};
