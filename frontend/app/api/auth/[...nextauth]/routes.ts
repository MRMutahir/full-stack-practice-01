import NextAuth from "next-auth";

import authOption from "./authOption";

const handler = NextAuth(authOption);

export { handler as POST, handler as GET };
