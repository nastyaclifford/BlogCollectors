import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
}).array("files");

app.post("/api/upload", upload, (req, res) => {
  console.log("success");
  console.log(req.files);
  if (!req.files) {
    return res.status(400).json({ error: "No files were uploaded." });
  }
  const fileNames = req.files.map((file) => file.filename);
  return res.status(200).json(fileNames);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(3000, () => {
  console.log("Connected!");
});
