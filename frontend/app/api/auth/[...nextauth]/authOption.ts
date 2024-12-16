import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions, ISODateString } from "next-auth";
import { signIn } from "next-auth/react";
import { JWT } from "next-auth/jwt";
import axios from "axios";
import { LOGIN_URL } from "@/lib/APIsEndPoints";

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login"
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          // API call with proper handling
          const response = await axios.post(LOGIN_URL, credentials);
          console.log('response', response)

          // Assuming response contains user data in the 'data' field
          const user = response.data;

          if (user) {
            return user;
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Login error:", error.message || error);

          // Returning a dummy user if the API call fails
          const dummyUser: CustomUser = {
            id: "12345678",
            email: "mutahir@gmail.com",
            name: "Muhammad Mutahir"
          };

          return dummyUser;
        }
      }
    })
  ],

  callbacks: {
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      session.user = token.user as CustomUser;
      return session;
    },

    async jwt({ token, user }: { token: JWT; user: CustomUser | null }) {
      if (user) {
        token.user = user;
      }
      return token;
    }
  }
};

export default NextAuth(authOptions);
