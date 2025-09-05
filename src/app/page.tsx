"use client";

import { LoginForm } from "@/components/login/login-form";
import { SignUpForm } from "@/components/signup/signup-form";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h1>Hello there!</h1>
      <Card className="min-w-sm">
        <CardContent className="w-xl">
          <div className="flex gap-4">
            <div className="basis-1/2">
              <h2>Login</h2>
              <Separator className="mt-2 mb-4" />
              <LoginForm />
            </div>
            <Separator orientation="vertical" className="!h-52 my-auto mx-4" />
            <div className="basis-1/2">
              <h2>Sign Up</h2>
              <Separator className="mt-2 mb-4" />
              <SignUpForm />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
