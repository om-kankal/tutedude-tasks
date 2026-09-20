const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const publicFolder = path.join(__dirname, "public");

function sendPage(res, fileName, statusCode = 200) {
  const filePath = path.join(publicFolder, fileName);

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<h1>500 - Server error</h1><p>Could not load the page.</p>");
      return;
    }

    res.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const requestPath = new URL(req.url, `http://localhost:${PORT}`).pathname;

  if (requestPath === "/") {
    sendPage(res, "index.html");
  } else if (requestPath === "/about") {
    sendPage(res, "about.html");
  } else if (requestPath === "/contact") {
    sendPage(res, "contact.html");
  } else if (requestPath === "/style.css") {
    const cssPath = path.join(publicFolder, "style.css");

    fs.readFile(cssPath, (error, data) => {
      if (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Unable to load stylesheet.");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  } else {
    sendPage(res, "404.html", 404);
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
