const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const publicFolder = path.join(__dirname, "public");
const pageRoutes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact": "contact.html",
};

function sendFile(res, fileName, contentType, statusCode = 200) {
  const safeRelativePath = fileName.replace(/^\/+/, "");
  const filePath = path.join(publicFolder, safeRelativePath);
  const resolvedPublicDir = path.resolve(publicFolder);
  const resolvedFilePath = path.resolve(filePath);

  if (!resolvedFilePath.startsWith(resolvedPublicDir)) {
    res.writeHead(403, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>403 - Forbidden</h1>");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<h1>500 - Server error</h1><p>Could not load the requested file.</p>");
      return;
    }

    res.writeHead(statusCode, { "Content-Type": contentType });
    res.end(data);
  });
}

function sendPage(res, fileName, statusCode = 200) {
  sendFile(res, fileName, "text/html; charset=utf-8", statusCode);
}

function sendAsset(res, fileName, statusCode = 200) {
  sendFile(res, fileName, "text/css; charset=utf-8", statusCode);
}

const server = http.createServer((req, res) => {
  const requestPath = new URL(req.url, `http://localhost:${PORT}`).pathname;
  const requestedFile = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");

  if (pageRoutes[requestPath]) {
    sendPage(res, pageRoutes[requestPath]);
  } else if (requestedFile.endsWith(".html")) {
    const validPage = ["index.html", "about.html", "contact.html", "404.html"].includes(requestedFile)
      ? requestedFile
      : "404.html";

    const finalStatus = validPage === "404.html" ? 404 : 200;
    sendPage(res, validPage, finalStatus);
  } else if (requestPath === "/style.css") {
    sendAsset(res, "style.css");
  } else {
    sendPage(res, "404.html", 404);
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
