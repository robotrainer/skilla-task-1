import { HOSTS } from "consts";

class FetchError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
    public url: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "FetchError";
  }
}

function requiredHost(host: string) {
  if (!host) {
    throw new TypeError(`The host is strictly required.`);
  }
}

function assertPath(path: string) {
  const type = typeof path;
  if (type !== "string") {
    throw new TypeError(`The path should be a string, instead received a ${type}`);
  }
}

interface IBaseFetch extends RequestInit {
  query?: Record<string, string | undefined> | null;
  host?: string;
}

export async function baseFetch<T = unknown>(path: string, options: IBaseFetch = {}): Promise<T> {
  let url: string = "";

  try {
    const {
      headers,
      query = null,
      method = "GET",
      body,
      host = HOSTS.mainService, // TODO вынести из функции
      ...extraOpts
    } = options;

    assertPath(path);

    requiredHost(host);

    const token = import.meta.env.VITE_TOKEN; // TODO вынести из функции

    const reqOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      ...extraOpts,
    };

    if (body) {
      reqOptions.body = typeof body === "object" ? JSON.stringify(body) : body;
    }

    let queryString = "";
    if (query) {
      const queryWithoutUndefinedValue = Object.keys(query).reduce(
        (acc, curr) => (query[curr] !== undefined ? { ...acc, [curr]: query[curr] } : acc),
        {}
      );

      queryString = new URLSearchParams(queryWithoutUndefinedValue).toString();
      queryString = queryString && `?${queryString}`;
    }

    url = `${host}${path}${queryString}`;
    const response = await fetch(url, reqOptions);

    let data: unknown;

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else if (
      contentType &&
      contentType.includes("audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3")
    ) {
      data = await response.blob();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new FetchError(
        `HTTP Error: ${response.status}`,
        response.status,
        response.statusText,
        url,
        data
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }

    throw new FetchError(
      error instanceof Error ? error.message : "Network error",
      0,
      "Network Error",
      url
    );
  }
}
