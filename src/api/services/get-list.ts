import { baseFetch } from "../base-fetch";

import type { ICallsResponse } from "types";

interface IGetListQueryParams {
  date_start: string;
  date_end: string;
  in_out?: string; // "0" | "1"
  limit?: string;
  [key: string]: string | undefined;
}

export const getList = async (query: IGetListQueryParams) => {
  return await baseFetch<ICallsResponse>("/getList", {
    method: "POST",
    query,
  });
};
