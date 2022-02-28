import AWS from "util/aws";

export interface auth {
  auth_status: boolean;
  auth_token: string;
  provider_sub: string;
}

/**
 * Fetch AWS Authorization token from dynamodb table used by next-auth
 * @param next_id sub from next-auth session
 * @returns auth
 */
const fetchAuthToken = async (next_id: string): Promise<auth> => {
  // default return value (will be modified by query)
  let ret_value: auth = {
    auth_status: false,
    auth_token: "",
    provider_sub: "",
  };

  if (next_id === "") {
    console.log("Whoops a daisy");
    return ret_value;
  }


  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = "next-auth";
  const pk = "USER#" + next_id; // partition key

  const params = {
    TableName: table,
    KeyConditionExpression: "#pk = :partitionkey",
    ExpressionAttributeNames: {
      "#pk": "pk",
    },
    ExpressionAttributeValues: {
      ":partitionkey": pk,
    },
  };

  try {
    const result = await docClient.query(params).promise();
    result.Items?.forEach((item) => {
      /**
       * next-auth creates ACCOUNT & USER items for each authenticated user
       * USER table contains information about the next-auth session
       * ACCOUNT table contains information about the user's cognito session
       * the cognito session information contains the accessToken, idToken & other important fields to access AWS resources
       */
      if (item.type === "ACCOUNT") {
        ret_value.auth_status = true;
        ret_value.auth_token = item.accessToken;
        ret_value.provider_sub = item.providerAccountId;
      }
    });
  } catch (err) {
    console.log(err);
  }

  // console.log(ret_value);
  return ret_value;
};

export default fetchAuthToken;
