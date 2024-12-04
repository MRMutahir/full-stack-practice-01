import { z } from "zod";

const PostValidator = z.object({
  title: z.string({ message: "title is required." }),
  description: z.string({ message: "description is required." }),
  image: z.string({ message: "image is required" }).optional(),
  expire_at: z.string({ message: "Expire date is required" }).length(5, { message: "Please correct Date" })
});

export { PostValidator };
