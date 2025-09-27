import NextAuth , {DefaultSession}from "next-auth";


// নেক্সট-অথ পুরোটা কাজ করে শুধু লগইন করার জন্য। 
declare module "next-auth" {
  
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
    }& DefaultSession["user"];
  }
}
