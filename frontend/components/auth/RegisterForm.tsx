"use client";

import { RegisterAction } from "@/app/actions/AuthActions";
import SubmitBtn from "@/components/common/SubmitBtn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {  useActionState} from "react";

const RegisterForm = () => {

  const [state, formAction] = useActionState(RegisterAction, {
    status: 0,
    message: "",
    errors: {}
  });
  return (
    <form action={formAction}>
      <div className="mt-4">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="name"
          name="name"
          placeholder="Enter your name"
        />
        <span className="text-red-500">{state?.errors.name}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        <span className="text-red-500">{state?.errors.email}</span>

      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <span className="text-red-500">{state?.errors.password}</span>

        <div className="text-right font-bold">
          <Link href="forget-password">Forget Password</Link>
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Confirm Password</Label>
        <Input
          id="cpassword"
          type="password"
          name="confirm_password"
          placeholder="Enter your confirm password"
        />
        <span className="text-red-500">{state?.errors.confirm_password}</span>
      </div>
      <div className="mt-4">
        <SubmitBtn />
      </div>
    </form>
  );
};

export default RegisterForm;
