import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

//Ховаєм наші дані google cloud сховища в env файлі
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},
  async signIn({ profile }) {
    try {
      //serverless => lambda => dynamodb
      await connectToDB();
      //тепер треба зробити перевірку чи існує уже користувач
      // якщо користувач не існує, тоді створити нового користувача та зберегти в базу даних
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
