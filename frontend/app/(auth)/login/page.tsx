import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
const login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white rounded-xl py-5 px-10 shadow-md">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text text-center">
          MR21
        </h1>
        <h1 className="text-3xl font-bold">Login</h1>
        <p>Welcome back</p>
        <LoginForm />
        <p className="text-center mt-2">
          Don't have an account ?{" "}
          <strong>
            <Link href="/register">Register</Link>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default login;
