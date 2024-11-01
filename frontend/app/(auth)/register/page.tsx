import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const register = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white rounded-xl py-5 px-10 shadow-md">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text text-center">
          MR21
        </h1>
        <h1 className="text-3xl font-bold">Register</h1>
        <p>Welcome</p>
        <form>
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
            <Button className="w-full" variant="secondary">
              Submit
            </Button>
          </div>
        </form>
        <p className="text-center mt-2">
          Already have an account ?{" "}
          <strong>
            <Link href="/register">Register</Link>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default register;
