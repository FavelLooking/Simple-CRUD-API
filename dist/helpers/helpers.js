export const sendResponse = (res, statusCode, contentType, message) => {
    res.writeHead(statusCode, { "Content-Type": contentType });
    res.end(message);
};
