import { useUserData } from "@nhost/nextjs";
import React, { useContext, useEffect } from "react";

import posthog from "posthog-js";

const UserContext = React.createContext(null);

export function UserProvider({ children = null }) {
  const user = useUserData();

  useEffect(() => {
    if (user) {
      posthog.identify(user.id);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
