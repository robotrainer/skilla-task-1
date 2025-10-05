import { baseFetch } from "../base-fetch";

import type { ICallsResponse } from "types";

interface IGetListQueryParams {
  date_start: string;
  date_end: string;
  in_out?: string; // "0" | "1"
  [key: string]: string | undefined;
}

// const item: TableItem = {
//   id: 4888120,
//   partnership_id: "136",
//   partner_data: {
//     id: "336",
//     name: "ИП Василек",
//     phone: "7484xxxxxx",
//   },
//   date: "2022-04-19 12:10:08",
//   date_notime: "2022-04-19",
//   time: 58,
//   from_number: "79315xxxxxx",
//   from_extension: "",
//   to_number: "sip:hr_xxx@vpbx400105738.mangosip.ru",
//   to_extension: "671",
//   is_skilla: 0,
//   status: "Дозвонился",
//   record: "MToxMDA2NzYxNToxNDM0ODcwNDQzMzow",
//   line_number: "sip:userxx@vpbx400105738.mangosip.ru",
//   line_name: "название линии(источник)",
//   in_out: 1,
//   from_site: 0,
//   source: "",
//   errors: [],
//   disconnect_reason: "",
//   results: [],
//   stages: [],
//   abuse: {
//     date: "2022-05-17 14:35:05",
//     person_name: "Никита",
//     message: "Тестовая жалоба на звонок. Тест тест, можно не отвечать.",
//     support_read_status: 1,
//     support_answer_status: 1,
//     answers: [
//       {
//         message: "Уважаемый Никита. Проверили.",
//         from_support: 1,
//         support_read_status: 1,
//         person_read_status: 1,
//       },
//     ],
//   },
//   contact_name: "",
//   contact_company: "",
//   person_id: 4042,
//   person_name: "Татьяна",
//   person_surname: "Михалкович",
//   person_avatar: "https://lk.skilla.ru/img/noavatar.jpg",
// };

export const getList = async (query: IGetListQueryParams) => {
  return await baseFetch<ICallsResponse>("/getList", {
    method: "POST",
    query,
  });
};
