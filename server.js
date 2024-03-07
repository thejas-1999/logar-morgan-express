const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

const PORT = process.env.PORT || 3001;

morgan.token(
  "id",
  (getId = (req) => {
    return req.id;
  })
);

const assignedId = (req, res, next) => {
  req.id = uuidv4();
  next();
};

app.use(assignedId);

let accessLogStream = fs.createWriteStream(
  path.join(__dirname, "accessLog.log"),
  { flag: "a" }
);

app.use(morgan(`:id :method `, { stream: accessLogStream }));

app.use(morgan(`:id  `));
app.get("/", (req, res) => {
  res.send("Morgan Loggar Application");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
