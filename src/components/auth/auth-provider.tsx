"use client";

import { onIdTokenChanged } from "@/lib/firebase/auth";
import { deleteCookie, setCookie } from "cookies-next";
import { User } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";

// interface AuthContextProps {
//   user: User | null;
//   setUser: Dispatch<React.SetStateAction<User | null>>;
// }

const AuthContext = createContext({} as User | null);

function useUserSession(initialUser: User | null) {
  useEffect(() => {
    return onIdTokenChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        await setCookie("__session", idToken);
      } else {
        await deleteCookie("__session");
      }
      if (initialUser?.uid === user?.uid) {
        return;
      }
    });
  }, [initialUser]);

  return initialUser;
}

function AuthProvider({
  currentUser,
  children,
}: {
  currentUser: User;
  children: React.ReactNode;
}) {
  useUserSession(currentUser);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
