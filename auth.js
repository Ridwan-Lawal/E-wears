import { addNewUser, getUsersEmail } from "@/app/_lib/data-service";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [Google],
  pages: {
    signIn: "/user/sign-in",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },

    async signIn({ user }) {
      console.log(user);
      try {
        const isUserExistInDatabase = await getUsersEmail(user?.email);

        if (!isUserExistInDatabase.length) {
          await addNewUser({ userEmail: user?.email, fullName: user?.name });
        }

        return true;
      } catch (err) {
        console.log(err.message, "sign");
        return false;
      }

      //   check for any user in supabase that has an email that matches the email of the current session, and get the user_id of that user and add it to the current session. and use the id to get only the users data
    },
    session: async ({ session }) => {
      const currentUser = await getUsersEmail(session.user.email);
      session.user.userId = currentUser?.[0]?.user_id;
      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
