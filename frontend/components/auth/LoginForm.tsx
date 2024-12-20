"use client";

import { useActionState, useEffect } from "react";
import { LoginAction } from "@/app/actions/AuthActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitBtn from "../common/SubmitBtn";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'


const LoginForm = () => {
  const router = useRouter(); 
const [state, formAction] = useActionState(LoginAction, {
    status: 0,
    message: "",
    errors: {},
  });

  const sendCredentials = async (email: string, password: string) => {
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: "/"
      });
  
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
  
      // Wait for 15 seconds before proceeding
      await new Promise(resolve => setTimeout(resolve, 15000));
    }
  };
  

  useEffect(() => {
    if (state && state.status) {
      if (state.status === 200) {
        toast.success(state.message);
        router.push("/dashboard");
      } else if (state.status && state.status >= 400) {
        // console.log('error state', state)
        toast.error(state.message || "Something went wrong?");
      }
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" placeholder="Enter your email" />
        <p className="text-red-500">{state?.errors?.email}</p>
      </div>

      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password" placeholder="Enter your password" />
        <p className="text-red-500">{state?.errors?.password}</p>
        <div className="text-right font-bold">
          <Link href="forget-password">Forget Password?</Link>
        </div>
      </div>

      <div className="mt-4">
        <SubmitBtn />
      </div>
    </form>
  );
};

export default LoginForm;
