import { ServerResponse } from "http";

export const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  contentType: string,
  message: string,
) => {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(message);
};
