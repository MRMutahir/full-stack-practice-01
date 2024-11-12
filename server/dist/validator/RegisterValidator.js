import { z } from "zod";
const registerValidator = z.object({
    name: z
        .string({ message: "Name is required." })
        .min(3, { message: "Name must be at least 3 characters long." }),
    email: z
        .string({ message: "Email is required." })
        .email({ message: "Invalid email format." }),
    password: z
        .string({ message: "Password is required." })
        .min(6, { message: "Password must be at least 6 characters long." }),
    // confirm_password: z
    //     .string({ message: "Confirm Password is required." })
    //     .min(6, { message: "Confirm Password must be at least 6 characters long." }),
});
// .refine((data) => data.password === data.confirm_password, {
//     message: "Passwords do not match.",
//     path: ["confirm_password"]
// });
export { registerValidator };
