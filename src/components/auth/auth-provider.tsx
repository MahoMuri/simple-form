"use client";

import { onAuthStateChanged } from "@/lib/firebase/auth";
import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

// interface AuthContextProps {
//   user: User | null;
//   setUser: Dispatch<React.SetStateAction<User | null>>;
// }

const AuthContext = createContext({} as User | null);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        return onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                return;
            }
            setUser(null);
        });
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}

export { AuthContext, AuthProvider, useAuth };
