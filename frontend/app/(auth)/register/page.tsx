import RegisterForm from "@/components/auth/RegisterForm";
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
        <RegisterForm />
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
