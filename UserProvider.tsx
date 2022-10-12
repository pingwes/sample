import { useUserData } from "@nhost/nextjs";
import React, { useContext, useEffect } from "react";


const UserContext = React.createContext(null);

export function UserProvider({ children = null }) {
  const user = useUserData();

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
