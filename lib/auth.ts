import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PassThrough } from "stream";
export const authOptions : NextAuthOptions = {
  providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" , placeholder: "password"}, 
            },
    })
  ],
};