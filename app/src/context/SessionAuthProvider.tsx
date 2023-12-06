'use client';

import React from "react";
import { SessionProvider } from "next-auth/react";

interface SessionAuthProviderProps {
  children: React.ReactNode;
}

const SessionAuthProvider = ({ children }: SessionAuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionAuthProvider;
