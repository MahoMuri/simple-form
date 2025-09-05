"use client";

import { AuthContext } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/firebase/auth";
import { useContext } from "react";

export default function Dashboard() {
  const user = useContext(AuthContext);

  return (
    <div>
      <h1>Hello, {user?.email}</h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
