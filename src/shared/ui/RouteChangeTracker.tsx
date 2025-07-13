import { useEffect } from "react";
import { useNavigation } from "react-router-dom";
import NProgress from "nprogress";

export function RouteChangeTracker() {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start();
    } else if (navigation.state === "idle") {
      NProgress.done();
    }
  }, [navigation.state]);

  return null;
}
