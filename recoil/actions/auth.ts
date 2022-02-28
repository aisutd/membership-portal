import axios from "axios";
import { auth } from "util/db/auth";
import env from "util/env";

const fetch_token = async (next_id: string): Promise<auth> => {
  try {
    if (next_id === "") {
      return {
        auth_status: false,
        auth_token: "",
        provider_sub: "",
      };
    }

    const res = await axios.get("/api/key");

    return {
      auth_status: res.data.status,
      auth_token: res.data.access_token,
      provider_sub: res.data.provider_sub,
    };
  } catch (err) {
    console.log(err);

    return {
      auth_status: false,
      auth_token: "",
      provider_sub: "",
    };
  }
};

export default fetch_token;
