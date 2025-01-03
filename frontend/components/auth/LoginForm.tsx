"use client";

import { useActionState, useEffect } from "react";
import { LoginAction } from "@/app/actions/AuthActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitBtn from "../common/SubmitBtn";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [state, formAction] = useActionState(LoginAction, {
    status: 0,
    message: "",
    errors: {},
  });

  useEffect(() => {
    if (state && state.status) {  
      const { email, password } = state?.data || {};  
      if (state.status === 200 && email && password) {
        signIn("credentials", { email, password, redirect: true, callbackUrl: "/dashboard" });
        toast.success(state.message);
      } else if (state.status >= 400) {
        toast.error(state.message || "Something went wrong");
      }
    } else {
      toast.success("Welcome to the sign-in page 😊");
    }
  }, [state]);



  return (
    <form action={formAction}>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        <p className="text-red-500">{state?.errors?.email}</p>
      </div>

      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <p className="text-red-500">{state?.errors?.password}</p>
        <div className="text-right font-bold">
          <Link href="forget-password">Forget Password</Link>
        </div>
      </div>
      <div className="mt-4">
        {/* <Button className="w-full" variant="secondary">
          Submit
        </Button> */}
        <SubmitBtn />
      </div>
    </form>
  );
};

export default LoginForm;
