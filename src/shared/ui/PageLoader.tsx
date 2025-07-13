import nProgress from "nprogress";

import { useEffect } from "react";

export const PageLoader = () => {
  useEffect(() => {
    nProgress.start();
    return () => {
      nProgress.done();
    };
  }, []);

  return (
    <div className="Users-layout h-full w-full relative">
      <div className="absolute inset-0 flex items-center justify-center bg-white">
        <div className="w-20 h-20 border-[6px] border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    </div>
  );
};
