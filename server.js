const express = require("express");
const path = require("path");
const app = express();

console.log("starting server ....");

app.use(express.static(__dirname + "/myApp/"));

console.log("load port...");
app.listen(process.env.PORT || 8080);

console.log("load index");
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/myApp/index.html"));
});

console.log("end build!");
