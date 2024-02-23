const http = require("http"),
const fs = require("fs"),
const url = require("url");

http
  .createServer((request, response) => {
  let addr = request.url;
  let q = new URL(addr, "http://localhost:8080");
  filePath = "";

  if (q.pathname.includes("documentation")) {
    filePath = (_dirname + "/documentation.html");
  } else {
    filePath = "index.html";
  }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(data);
      response.end();
    });
  })
  .listen(8080);
  console.log("Server is running on Port 8080.");
