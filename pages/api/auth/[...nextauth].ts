import NextAuth from "next-auth";
import Providers from "next-auth/providers";

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
  debug: process.env.NODE_ENV === 'development' ? true : false
});
