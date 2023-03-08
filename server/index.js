require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const smsRoutes = require("./routes/sms");

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/sms", smsRoutes);

app.use("/", (req, res) => {
  res.send("Hello from SMSAuto!");
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  const data = error.data || [];

  res.status(status).json({ message, data, status });
});
const port = process.env.PORT || 5000;

const requiredEnv = [
  "TWL_SID",
  "TWL_AUTH_TOKEN",
  "TWL_MSG_ID",
  "TWL_MSG_ID",
  "JWT_SEC",
  "MONGO_DB_URL",
];
const start = () => {
  requiredEnv.forEach((env) => {
    if (!process.env[env]) {
      throw new Error(`${env} env variable is required`);
    }
  });
  const MONGO_URL = process.env.MONGO_DB_URL;
  mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((con) => {
      app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((err) => {
      console.log(err);
    });
};
start();
