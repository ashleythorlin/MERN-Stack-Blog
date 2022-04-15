  //create the express server
const express = require("express");
const app = express();  //cerate application
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(console.log("Connected to MONGODB")).catch((err) => console.log(err)); //if errors, check 10:00

const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, "images");
  }, filename:(req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded.");
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("8080", ()=>{
    console.log("Backend is running");
});
