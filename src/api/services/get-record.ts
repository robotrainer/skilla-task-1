import { baseFetch } from "api/base-fetch";

interface IGetRecordQueryParams {
  record: string;
  partnership_id: string;
  [key: string]: string;
}

export const getRecord = async (query: IGetRecordQueryParams) => {
  return await baseFetch<Blob>("/getRecord", {
    method: "POST",
    query,
  });
};
