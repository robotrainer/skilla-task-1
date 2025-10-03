import { baseFetch } from "../base-fetch";

interface IGetListQueryParams {
  date_start: string;
  date_end: string;
  in_out?: string; // "0" | "1"
  [key: string]: string | undefined;
}

export interface ICall {
  id: number; // id
  partnership_id: string; // id партнера
  partner_data: {
    id: string;
    name: string;
    phone: string;
  };
  date: string; // Дата и время звонка
  date_notime: string;
  time: number; // Длительность звонка
  from_number: string; // Номер с которого был звонок
  from_extension: string;
  to_number: string;
  to_extension: string;
  is_skilla: number;
  status: string;
  record: string; // id записи звонка
  line_number: string;
  line_name: string;
  in_out: number | null; // Признак входящего или исходящего звонка (1 - входящий звонок, 0 - исходящий звонок, пусто - все звонки)
  from_site: number;
  source: string; // Источник
  errors: [];
  disconnect_reason: string;
  results: [];
  stages: [];
  abuse: {
    date: string;
    person_name: string;
    message: string;
    support_read_status: number;
    support_answer_status: number;
    answers: [
      {
        message: string;
        from_support: number;
        support_read_status: number;
        person_read_status: number;
      },
    ];
  };
  contact_name: string; // Имя абонента
  contact_company: string; // Название компании
  person_id: number;
  person_name: string;
  person_surname: string;
  person_avatar: string; // Аватар
}

export interface ICallsResponse {
  total_rows: string;
  results: ICall[];
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
