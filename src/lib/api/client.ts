export class ApiError extends Error {
  public readonly status: number;
  public readonly url: string;
  public readonly details?: unknown;

  constructor(args: { message: string; status: number; url: string; details?: unknown }) {
    super(args.message);
    this.name = "ApiError";
    this.status = args.status;
    this.url = args.url;
    this.details = args.details;
  }
}

type QueryParamValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryParamValue>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function buildQueryString(params: QueryParams | undefined): string {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  for (const [key, rawValue] of Object.entries(params)) {
    if (rawValue === undefined || rawValue === null) continue;

    const value = typeof rawValue === "string" ? rawValue.trim() : String(rawValue);
    if (value.length === 0) continue;

    searchParams.set(key, value);
  }

  const query = searchParams.toString();
  return query.length > 0 ? `?${query}` : "";
}

async function parseJsonSafely(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type");
  const isJson = typeof contentType === "string" && contentType.includes("application/json");
  if (!isJson) return undefined;

  try {
    return (await response.json()) as unknown;
  } catch {
    return undefined;
  }
}

export interface ApiClient {
  get: <T>(path: string, options?: { query?: QueryParams; signal?: AbortSignal }) => Promise<T>;
}

export function createApiClient(args: {
  baseUrl: string;
  fetchFn?: typeof fetch;
  defaultFetchOptions?: Pick<RequestInit, "cache">;
}): ApiClient {
  const fetchFn = args.fetchFn ?? fetch;

  return {
    async get<T>(
      path: string,
      options?: { query?: QueryParams; signal?: AbortSignal },
    ): Promise<T> {
      const url = new URL(path, args.baseUrl);
      url.search = buildQueryString(options?.query);

      const response = await fetchFn(url, {
        method: "GET",
        signal: options?.signal ?? null,
        ...(args.defaultFetchOptions?.cache ? { cache: args.defaultFetchOptions.cache } : {}),
        headers: {
          accept: "application/json",
        },
      });

      const body = await parseJsonSafely(response);

      if (!response.ok) {
        const message =
          (isRecord(body) && typeof body.error === "string" && body.error.trim().length > 0
            ? body.error
            : response.statusText) || "Request failed";

        throw new ApiError({
          message,
          status: response.status,
          url: url.toString(),
          details: body,
        });
      }

      return body as T;
    },
  };
}
