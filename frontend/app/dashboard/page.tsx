import Navbar from "@/components/base/Navbar";
import AddPosts from "@/components/Posts/AddPosts";
import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="text-end mt-10">
        <AddPosts />
      </div>
    </div>
  );
};

export default page;
