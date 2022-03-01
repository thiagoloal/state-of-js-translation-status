export enum HttpStatusCode {
  unathorized = 401,
  badRequest = 400,
  forbidden = 403,
  noContent = 204,
  serverError = 500,
  notFound = 404,
  ok = 200,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};
