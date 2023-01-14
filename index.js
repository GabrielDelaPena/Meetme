const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Routes
const userRoute = require("./routes/user");
const invitationRoute = require("./routes/invitation");
const meetupRoute = require("./routes/meetup");

// Configurations
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3030;

// Middlewares
app.use(express.json());
app.use(cors());
app.get("/", async (req, res) => {
  res.status(200).send("Welcome to my API");
});
app.use("/api/user", userRoute);
app.use("/api/invitation", invitationRoute);
app.use("/api/meetup", meetupRoute);

// MongoDB Connection
app.listen(PORT, () => {
  console.log(`backend server started on port ${PORT}`);
  mongoose
    .connect(process.env.MONGODB)
    .then((result) => console.log("mongodb connected"))
    .catch((error) => console.log(error));
});
