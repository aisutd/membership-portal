import * as AWS from "aws-sdk";
import env from "util/env";

// setup AWS configuration, note: using AWS SDK V2 not V3
AWS.config.update({
  accessKeyId: env.NEXT_AUTH_AWS_ACCESS_KEY,
  secretAccessKey: env.NEXT_AUTH_AWS_SECRET_KEY,
  region: env.NEXT_AUTH_AWS_REGION,
});

export default AWS;
