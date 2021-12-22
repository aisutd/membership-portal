import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import type { ApiFuncs, ApiResponseData } from "util/functions";
import { fetchProfile, profile } from "util/db/profile";
import jsonwebtoken from "jsonwebtoken";

interface Data extends ApiResponseData, profile {

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
    // Response for GET requests
    GET: async (
      req: NextApiRequest,
      res: NextApiResponse<Data>
    ) => {

      try {
        const decoded_token = jsonwebtoken.decode(req.headers['authorization']?.split(" ")[1] as string, { complete: true }) as any;
        const authItem = await fetchProfile(decoded_token.payload.sub);

        res.json({
          status: true,
          message: "success",
          ...authItem,
        });
      } catch (err) {
        console.log(err);
        res.json({
          status: false,
          message: "failed to fetch access token",
          exists: false,
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
