const env =
  process.env.NODE_ENV === "development"
    ? {
        NEXTAUTH_URL: process.env.DEV_NEXTAUTH_URL as string,
        COGNITO_CLIENT_ID: process.env.DEV_COGNITO_CLIENT_ID as string,
        COGNITO_CLIENT_SECRET: process.env.DEV_COGNITO_CLIENT_SECRET as string,
        COGNITO_DOMAIN: process.env.DEV_COGNITO_DOMAIN as string,

        NEXT_AUTH_AWS_ACCESS_KEY: process.env
          .DEV_NEXT_AUTH_AWS_ACCESS_KEY as string,
        NEXT_AUTH_AWS_SECRET_KEY: process.env
          .DEV_NEXT_AUTH_AWS_SECRET_KEY as string,
        NEXT_AUTH_AWS_REGION: process.env.DEV_NEXT_AUTH_AWS_REGION as string,
      }
    : {
        NEXTAUTH_URL: process.env.PROD_NEXTAUTH_URL as string,
        COGNITO_CLIENT_ID: process.env.PROD_COGNITO_CLIENT_ID as string,
        COGNITO_CLIENT_SECRET: process.env.PROD_COGNITO_CLIENT_SECRET as string,
        COGNITO_DOMAIN: process.env.PROD_COGNITO_DOMAIN as string,

        NEXT_AUTH_AWS_ACCESS_KEY: process.env
          .PROD_NEXT_AUTH_AWS_ACCESS_KEY as string,
        NEXT_AUTH_AWS_SECRET_KEY: process.env
          .PROD_NEXT_AUTH_AWS_SECRET_KEY as string,
        NEXT_AUTH_AWS_REGION: process.env.PROD_NEXT_AUTH_AWS_REGION as string,
      };

export default env;