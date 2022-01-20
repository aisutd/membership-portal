import * as AWS from "aws-sdk";

// setup AWS configuration, note: using AWS SDK V2 not V3
AWS.config.update({
  accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
  region: process.env.NEXT_AUTH_AWS_REGION,
});

export default AWS;
