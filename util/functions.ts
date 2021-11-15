import type { NextApiRequest, NextApiResponse } from "next";

export interface ApiResponseDefaultData {
  status: boolean;
  message: string;
}

export type ApiResponseData<T> = ApiResponseDefaultData & T;

export interface ApiFuncs<GetType> {
  GET?(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseData<GetType>>
  ): Promise<void>;

  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}
