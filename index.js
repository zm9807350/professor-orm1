const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Auto-load all route files from /routes
const routesPath = path.join(__dirname, "routes");
fs.readdirSync(routesPath).forEach(file => {
  if (file.endsWith(".js")) {
    const route = require(path.join(routesPath, file));
    const routeName = "/" + file.replace(".js", ""); // filename = route
    app.use(routeName === "/index" ? "/" : routeName, route);
    console.log(`✅ Loaded route: ${routeName}`);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
