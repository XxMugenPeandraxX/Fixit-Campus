const express = require("express");
require("dotenv").config();
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

//rm for now, uncomment when db is ready
db.connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//routes
const usersRoute = require("./routes/userRouter");
const reportsRoute = require("./routes/reportRouter");
const categoriesRoute = require("./routes/categoryRouter");
const commentsRoute = require("./routes/commentRouter");
const notificationsRoute = require("./routes/notificationRouter");

app.use("/api/report", reportsRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
