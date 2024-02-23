const url = require("url");
let addr = request.url;
let q = new URL(addr, "documentation");

const http = require("http");

http
  .createServer((request, responst) => {
    Response.writeHead(200, { "Content-Type": "text/plain" });
    Response.end("Hello Node!");
  })
  .listen(8080);

const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("File content: " + data.toString());
});
