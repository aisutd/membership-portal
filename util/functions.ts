import type { NextApiRequest, NextApiResponse } from "next";

export interface ApiResponseData {
  status: boolean;
  message: string;
}

export interface ApiFuncs {
  GET?(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseData>
  ): Promise<void>;

  POST?(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseData>
  ): Promise<void>;

  PUT?(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseData>
  ): Promise<void>;

  DELETE?(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseData>
  ): Promise<void>;
}
