const express = require("express");
const { createRequestHandler } = require("@remix-run/express");

const app = express();

app.use(express.static("public"));

app.all("*", createRequestHandler({ getLoadContext() {} }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});