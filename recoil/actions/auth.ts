import axios from "axios";
import { auth } from "util/db/auth";

const fetch_token = async (next_id: string): Promise<auth> => {
  try {
    // TODO: import an axios instance with pre-configured base url
    const res = await axios.get("http://localhost:3000/api/key");

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