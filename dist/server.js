import http from "http";
import { validate as isValidUuid, v4 as uuidv4 } from "uuid";
import { lotrCharacters } from "./data/characters.js";
import { sendResponse } from "./helpers/helpers.js";
import dotenv from "dotenv";
dotenv.config();
const server = http.createServer((req, res) => {
    const urlSplittedArray = req.url?.split("/").filter(Boolean);
    switch (req.method) {
        case "GET":
            if (urlSplittedArray &&
                urlSplittedArray[0] === "api" &&
                urlSplittedArray[1] === "users") {
                if (urlSplittedArray.length === 2) {
                    sendResponse(res, 200, "application/json", JSON.stringify(lotrCharacters));
                }
                else if (urlSplittedArray.length === 3) {
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
                    sendResponse(res, 404, "text/plain", "Not Found");
                }
            }
            else {
                sendResponse(res, 404, "text/plain", "Not Found");
            }
            break;
        case "POST":
            if (urlSplittedArray &&
                urlSplittedArray[0] === "api" &&
                urlSplittedArray[1] === "users") {
                let body = "";
                req.on("data", (chunk) => (body += chunk.toString()));
                req.on("end", () => {
                    try {
                        const newUser = JSON.parse(body);
                        if (!newUser.username ||
                            typeof newUser.username !== "string" ||
                            !newUser.age ||
                            typeof newUser.age !== "number" ||
                            !Array.isArray(newUser.hobbies) ||
                            !newUser.hobbies.every((hobby) => typeof hobby === "string")) {
                            sendResponse(res, 400, "text/plain", "Invalid user data");
                            return;
                        }
                        newUser.id = uuidv4();
                        lotrCharacters.push(newUser);
                        sendResponse(res, 201, "application/json", JSON.stringify(newUser));
                    }
                    catch (error) {
                        sendResponse(res, 400, "text/plain", "Invalid JSON");
                    }
                });
            }
            else {
                sendResponse(res, 404, "text/plain", "Not Found");
            }
            break;
        case "PUT":
            if (urlSplittedArray &&
                urlSplittedArray[0] === "api" &&
                urlSplittedArray[1] === "users" &&
                urlSplittedArray.length === 3) {
                const userId = urlSplittedArray[2];
                if (!isValidUuid(userId)) {
                    sendResponse(res, 400, "text/plain", "Wrong UUID");
                    return;
                }
                let body = "";
                req.on("data", (chunk) => (body += chunk.toString()));
                req.on("end", () => {
                    try {
                        const userToUpdate = JSON.parse(body);
                        console.log(userToUpdate);
                        const userIndex = lotrCharacters.findIndex((char) => char.id === userId);
                        if (userIndex === -1) {
                            sendResponse(res, 404, "text/plain", "User not found.");
                            return;
                        }
                        lotrCharacters[userIndex] = {
                            ...lotrCharacters[userIndex],
                            ...userToUpdate,
                        };
                        sendResponse(res, 200, "application/json", JSON.stringify(lotrCharacters[userIndex]));
                    }
                    catch (error) {
                        sendResponse(res, 400, "text/plain", "Invalid JSON");
                    }
                });
            }
    }
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
