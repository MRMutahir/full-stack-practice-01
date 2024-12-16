"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full"
      variant="secondary"
      disabled={pending}
      type="submit"
    >
      {pending ? "Processing" : "Submit"}
    </Button>
  );
};

export default SubmitBtn;
