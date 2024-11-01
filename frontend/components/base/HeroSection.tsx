import Image from "next/image";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="w-full h-screen flex justify-center flex-col items-center">
      <div>
        <Image src="/Banner.svg" width={600} height={600} alt="banner image" />
      </div>
      <div className="text-center mt-4">
        <h1 className="md:text-7xl lg:text-9xl text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
        MR21
        </h1>
        <p className="text-2xl md:text-3xl lg:text-4xl">
          Discover the better choice together
        </p>
        <Link href="/login">
          {/* <Button className="mt-2" variant="outline">
            Start Free
          </Button> */}
          <Button className="mt-2">
            <Mail /> Login with Email
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
