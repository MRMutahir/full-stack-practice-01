"use client";
import { registerAction } from "@/app/actions/AuthActions";
import SubmitBtn from "@/components/common/SubmitBtn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
const RegisterForm = () => {
  return (
    <form action={registerAction}>
      <div className="mt-4">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="name"
          name="name"
          placeholder="Enter your name"
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
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
        {/* <div className="text-right font-bold">
    <Link href="forget-password">Forget Password</Link>
  </div> */}
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

export default RegisterForm;
