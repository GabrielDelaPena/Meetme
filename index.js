const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const multer = require("multer");
const path = require("path");
const Image = require("./models/Image");

// Routes
const userRoute = require("./routes/user");
const invitationRoute = require("./routes/invitation");
const meetupRoute = require("./routes/meetup");

// Configurations
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3030;

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: Storage });

// Middlewares
app.use(express.json());
app.use(cors());
app.get("/", async (req, res) => {
  res.status(200).send("Welcome to my API");
});
app.use("/api/user", userRoute);
app.use("/api/invitation", invitationRoute);
app.use("/api/meetup", meetupRoute);

app.post("/upload", upload.single("image"), async (req, res) => {
  const name = req.body.name;
  const file = req.file;

  if (!file) {
    res.status(400).send("Pls upload a file.");
  }

  const image = new Image({
    name: name,
    image: {
      data: file.filename,
      contentType: "image/jpg",
    },
  });

  try {
    await image.save();
    console.log("IMAGE SAVED");
    res.status(200).send("Image uploaded.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on the server.");
  }
});

app.get("/upload/:imageID", async (req, res) => {
  const imageID = req.params.imageID;

  try {
    const image = await Image.findOne({ _id: imageID });
    if (!image) {
      res.status(400).send("Image not found.");
    }
    const buffer = Buffer.from(image.image.data, "base64");
    console.log(typeof buffer);
    console.log("FETCHED IMAGE");
    res.status(200).send(buffer);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error in da Server.");
  }
});

// MongoDB Connection
app.listen(PORT, () => {
  console.log(`backend server started on port ${PORT}`);
  mongoose
    .connect(process.env.MONGODB)
    .then((result) => console.log("mongodb connected"))
    .catch((error) => console.log(error));
});
