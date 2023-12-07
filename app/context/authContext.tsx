// authContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { updateAxiosToken } from "../axios";

const AuthContext = createContext({
  authToken: "",
  setAuthToken: (token: string) => {},
});

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProps) => {
  const { data: session } = useSession();
  const [authToken, setAuthToken] = useState<string>("");

  useEffect(() => {
    if (session) {
      setAuthToken((session.token as string) || "");
      setAuthToken("");
      updateAxiosToken(session.token as string);
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
