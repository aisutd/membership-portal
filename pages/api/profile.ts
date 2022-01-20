import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import type { ApiFuncs, ApiResponseData } from "util/functions";
import {
  fetchProfile,
  updateProfile,
  profile,
  profile_update_schema,
} from "util/db/profile";
import jsonwebtoken from "jsonwebtoken";

interface Data extends ApiResponseData, profile {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const session = await getSession({ req });

  // Require next-auth session & AWS Authorization header
  if (!session || req.headers["authorization"] === "") {
    res.status(401).json({
      status: false,
      message: "invalid session",
    });
    return;
  }

  const method = req.method as keyof ApiFuncs;

  const decoded_token = jsonwebtoken.decode(
    req.headers["authorization"]?.split(" ")[1] as string,
    { complete: true }
  ) as any;

  const handleCase: ApiFuncs = {
    // Response for GET requests
    GET: async (req: NextApiRequest, res: NextApiResponse<Data>) => {
      try {
        // Use the cognito id from the authorization token to prevent user from tampering with the request
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
    /**
     * Update single field on user's profile
     * @param req NextApiRequest
     * @param res NextApiResponse<Data>
     */
    PUT: async (req: NextApiRequest, res: NextApiResponse<Data>) => {
      try {
        const updateOperation: profile_update_schema = {
          field: req.body.field,
          value: req.body.value,
        };

        const authItem = await updateProfile(
          decoded_token.payload.sub,
          updateOperation
        );

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
