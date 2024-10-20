import http from "http";
import { validate as isValidUuid } from "uuid";
import { lotrCharacters } from "./data/characters.js";
import { sendResponse } from "./helpers/helpers.js";
const server = http.createServer((req, res) => {
    const urlSplittedArray = req.url?.split("/").filter(Boolean);
    console.log(urlSplittedArray);
    if (req.method === "GET" &&
        urlSplittedArray &&
        urlSplittedArray[0] === "api" &&
        urlSplittedArray[1] === "users" &&
        urlSplittedArray.length === 2) {
        sendResponse(res, 200, "application/json", JSON.stringify(lotrCharacters));
    }
    else if (req.method === "GET" &&
        urlSplittedArray &&
        urlSplittedArray[0] === "api" &&
        urlSplittedArray[1] === "users" &&
        urlSplittedArray.length === 3) {
        const userId = urlSplittedArray[2];
        if (!isValidUuid(userId)) {
            sendResponse(res, 400, "text/plain", "Wrong UUID");
            return;
        }
        const user = lotrCharacters.find((char) => char.id === userId);
        if (user) {
            sendResponse(res, 200, "application/json", JSON.stringify(user));
        }
        else {
            sendResponse(res, 404, "text/plain", "User not found.");
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
