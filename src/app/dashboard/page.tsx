"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/firebase/auth";
import { redirect } from "next/navigation";

export default function Dashboard() {
    const user = useAuth();
    return (
        <div>
            <h1>Hello, {user?.email}</h1>
            <Button
                onClick={() => {
                    signOut();
                    redirect("/");
                }}
            >
                Sign Out
            </Button>
        </div>
    );
}
