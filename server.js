const express = require("express");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan(`:method :status :url "HTTP/:http-version" `));

app.get("/", (req, res) => {
  res.send("Morgan Loggar Application");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
