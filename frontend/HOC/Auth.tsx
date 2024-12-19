import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/ContextAPI/AuthContext";

const withAuth = Component => {
  return props => {
    const {isLoggedIn} = useContext(AuthContext);
    const router = useRouter();

    if (!isLoggedIn) {
      router.push("/login");
      return null; // Prevent rendering the component
    }

    return <Component {...props} />;
  };
};

export default withAuth;
