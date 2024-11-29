import HeroSection from "@/components/base/HeroSection";
import { getServerSession } from "next-auth";
import authOption from "./api/auth/[...nextauth]/authOption";

export default async function Home() {
  const session = await getServerSession(authOption);
  return (
    <div>
      {/* <Button variant="outline">Click me</Button> */}
      <p>
        {session ? JSON.stringify(session) : "session nh hen"}
      </p>
      <HeroSection />
    </div>
  );
}
