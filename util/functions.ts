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

// export interface one {
//   data: string;
// }

// export interface two {
//   data2: string;
// }

// export interface test<T> {
//   field: ApiResponseData & T;
// }

// const v: test<one> = {
//   field: {
//     status: true,
//     message: "string",
//     data: "hello",
//   },
// };

// const u: test<two> = {
//   field: {
//     status: true,
//     message: "string",
//     data2: "hello",
//   },
// };
