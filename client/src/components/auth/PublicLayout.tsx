import { userAuthStore } from "@/features/auth/store";
import { useAuth } from "@clerk/react";

import {Navigate, Outlet, useLocation} from "react-router";
import CommonLoader from "../common/Loader";

export function PublicLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { isBootstraped, status } = userAuthStore();
  const location = useLocation();

  if (!isLoaded) return null;
  if (isSignedIn && (!isBootstraped || status === "loading")) {
    return <CommonLoader />;
  }
  if (isSignedIn && location.pathname === "/sign-in" || location.pathname === "/sign-up") {
    return <Navigate to={"profile"} replace />;
  }

  return <Outlet />;
}
