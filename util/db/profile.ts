import AWS from "util/aws";

export interface profile {
  exists: boolean;
  user_id?: string;
  netid?: string;
  cognito_username?: string;
  email?: string;
  creation_date?: string;
  next_id?: string;
}

const fetchProfile = async (user_id: string): Promise<profile> => {

  if (user_id === "") {
    return {
        exists: false,
    };
  }

  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = "Users";

  const params = {
    TableName: table,
    Key: {
      UserID: user_id, // partition key
    },
  };

  try {
    const result = await docClient.get(params).promise();

    if (result.Item) {
      return {
        ...(result.Item as profile),
        user_id: result.Item.UserID,
        exists: true,
      }
    }
  } catch (err) {
    console.log(err);
  }
  return {
    exists: false,
  }
};

export default fetchProfile;
