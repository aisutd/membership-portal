import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import type { ApiFuncs, ApiResponseData } from "util/functions";
import fetchAuthToken from "util/db/auth";

interface Data extends ApiResponseData {
  access_token: string;
  provider_sub: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const session = await getSession({ req });

  if (!session) {
    res
      .status(401)
      .json({
        status: false,
        message: "invalid session",
      });
    return;
  }

  const method = req.method as keyof ApiFuncs;

  const handleCase: ApiFuncs = {
    /**
     * Fetch user's auth token and cognito id from next-auth session database entry
     * @param req 
     * @param res 
     */
    GET: async (
      req: NextApiRequest,
      res: NextApiResponse<Data>
    ) => {

      try {
        const authItem = await fetchAuthToken(session?.sub as string);

        res.json({
          status: true,
          message: "success",
          access_token: authItem.auth_token,
          provider_sub: authItem.provider_sub,
        });
      } catch (err) {
        console.log(err);
        res.json({
          status: false,
          message: "failed to fetch access token",
          access_token: "",
          provider_sub: "",
        });
      }
    },
  };

  const response = handleCase[method];

  if (response) {
    response(req, res);
  } else {
    res.status(405).json({
      status: false,
      message: "invalid method",
    });
  }
}
