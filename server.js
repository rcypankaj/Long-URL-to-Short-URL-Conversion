const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

app.listen(process.env.PORT, (req, res) => {
  console.log("Listening from ", process.env.PORT);
});
