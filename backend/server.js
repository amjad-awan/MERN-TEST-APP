const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { AuthRoute, TodoRoute } = require("./routes/index.js");
const { connectDB } = require("./db.js");
const cors = require("cors");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());

app.use(bodyParser.json());

app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/todo", TodoRoute);



app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
