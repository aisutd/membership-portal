import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter"
import AWS from "util/aws";
import { updateProfile } from "util/db/profile";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      domain: process.env.COGNITO_DOMAIN,
    }),
    // ...add more providers here
  ],
  adapter: DynamoDBAdapter(
    new AWS.DynamoDB.DocumentClient()
  ),
  session: {
    jwt: true,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async session(session, user) {
      session = { ...session, "sub": user.sub };
      return session;
    },

    async jwt(token, user, account, profile, isNewUser) {
      if (isNewUser) {
        await updateProfile(profile?.sub as string ?? "", token.sub as string ?? "");
      }
      return token;
    },
  },
});
