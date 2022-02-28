import AWS from "util/aws";

export interface profile {
  exists: boolean;
  user_id?: string;
  netid?: string;
  cognito_username?: string;
  email?: string;
  creation_date?: string;
  next_id?: string;
  roles?: string[];
}

export interface profile_update_schema {
  field: string;
  value: string;
}

/**
 * Fetch user profile
 * @param user_id cognito id
 * @returns user's profile
 */
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
      UserID: user_id, // partition key (also primary key)
    },
  };

  try {
    const result = await docClient.get(params).promise();

    if (result.Item) {
      return {
        ...(result.Item as profile),
        user_id: result.Item.UserID,
        exists: true,
      };
    }
  } catch (err) {
    console.log(err);
  }
  return {
    exists: false,
  };
};

/**
 * Update single field on a user's profile
 * @param user_id cognito id
 * @param update field & value to update
 * @returns updated user's profile'
 */
const updateProfile = async (
  user_id: string,
  update: profile_update_schema
): Promise<profile> => {
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
      UserID: user_id, // partition key (also primary key)
    },
    UpdateExpression: "set #key = :value",
    ExpressionAttributeNames: {
      "#key": update.field,
    },
    ExpressionAttributeValues: {
      ":value": update.value,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await docClient.update(params).promise();

    if (result.Attributes) {
      return {
        ...(result.Attributes as profile),
        user_id: result.Attributes.UserID,
        exists: true,
      };
    }
  } catch (err) {
    console.log(err);
  }
  return {
    exists: false,
  };
};

/**
 * Use this function to update a user's profile when the field is a StringSet (anytime you'd like to use an array-like structure)
 * @param user_id cognito id
 * @param update field & value to update
 * @returns updated user's profile
 */
const updateProfileSet = async (
  user_id: string,
  update: profile_update_schema
): Promise<profile> => {
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
      UserID: user_id, // partition key (also primary key)
    },
    UpdateExpression: "ADD #key :value",
    ExpressionAttributeNames: {
      "#key": update.field,
    },
    ExpressionAttributeValues: {
      ":value": docClient.createSet([update.value]),
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await docClient.update(params).promise();

    if (result.Attributes) {
      return {
        ...(result.Attributes as profile),
        user_id: result.Attributes.UserID,
        exists: true,
      };
    }
  } catch (err) {
    console.log(err);
  }
  return {
    exists: false,
  };
};

export { fetchProfile, updateProfile, updateProfileSet };
