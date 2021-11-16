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

  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}
