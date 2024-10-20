import http from "http";
import { validate as isValidUuid } from "uuid";
import { lotrCharacters } from "./data/characters.js";

const server = http.createServer((req, res) => {
  const urlSplittedArray = req.url?.split("/").filter(Boolean);
  console.log(urlSplittedArray);

  if (
    req.method === "GET" &&
    urlSplittedArray &&
    urlSplittedArray[0] === "api" &&
    urlSplittedArray[1] === "users" &&
    urlSplittedArray.length === 2
  ) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(lotrCharacters));
  } else if (
    req.method === "GET" &&
    urlSplittedArray &&
    urlSplittedArray[0] === "api" &&
    urlSplittedArray[1] === "users" &&
    urlSplittedArray.length === 3
  ) {
    const userId = urlSplittedArray[2];
    if (!isValidUuid(userId)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Wrong UUID");
      return;
    }
    const user = lotrCharacters.find((char) => char.id === userId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
  if (req.method === "GET" && req.url === `/api/users/user`) {
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
