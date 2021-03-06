import axios from "axios";
import { profile } from "util/db/profile";
import env from "util/env";

// Fetch user's profile
const fetch_profile = async (
  user_id: string,
  token: string
): Promise<Required<profile>> => {
  if (user_id === "" || token === "") {
    return {
      exists: false,
      user_id: user_id,
      netid: "",
      cognito_username: "",
      email: "",
      next_id: "",
      creation_date: (new Date()).toDateString(),
      roles: [],
    };
  }

  try {
    // not used but eventually to be used for implementing row level access control for dynamodb user items
    // https://aws.amazon.com/blogs/mobile/building-fine-grained-authorization-using-amazon-cognito-user-pools-groups/
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get("/api/profile", options);

    if (!res.data.status) {
      return {
        exists: false,
        user_id: user_id,
        netid: "",
        cognito_username: "",
        email: "",
        next_id: "",
        creation_date: (new Date()).toDateString(),
        roles: [],
      };
    }

    return {
      ...(res.data as Required<profile>),
    };
  } catch (err) {
    console.log(err);

    return {
      exists: false,
      user_id: user_id,
      netid: "",
      cognito_username: "",
      email: "",
      next_id: "",
      creation_date: (new Date()).toDateString(),
      roles: [],
    };
  }
};

export default fetch_profile;
