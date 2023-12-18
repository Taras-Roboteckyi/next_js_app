import NextAuth from "next-auth";
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

  //Зберігаєм дані користувача і його сесію в app
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });

    //Тепер оновлюєм його ідентифікатор
    session.user.id = sessionUser._id.toString();

    return session;
    //Таким чином оновлюєм користувача, щоб знати який користувач зараз онлайн
  },

  //Функція яка створює нового користувача
  async signIn({ profile }) {
    try {
      //serverless => lambda => dynamodb
      await connectToDB();

      //тепер треба зробити перевірку чи існує уже користувач
      const userExists = await User.findOne({
        email: profile.email,
      });

      // якщо користувач не існує, тоді створюєм нового користувача та зберігаєм  в базу даних

      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
