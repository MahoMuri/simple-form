"use client";

import { LoginForm } from "@/components/login/login-form";
import { SignInForm } from "@/components/signin/signin-form";
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
            <Separator orientation="vertical" className="!h-52 my-auto" />
            <div className="basis-1/2">
              <h2>Sign in</h2>
              <Separator className="mt-2 mb-4" />
              <SignInForm />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
