const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

const uploadDir = path.join(__dirname, "../client/public/assets/update-image");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.array("images", 10), (req, res) => {
  try {
    const filenames = req.files.map((file) => file.filename);
    res.status(200).json({ message: "Tải ảnh lên thành công", filenames });
  } catch (error) {
    res.status(500).send("Tải ảnh lên thất bại");
  }
});

app.post("/send-email", (req, res) => {
  const { email, html } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "trieubxpd09711@fpt.edu.vn",
      pass: "alwh sozf hwym bifn",
    },
  });

  const mailOptions = {
    from: "trieubxpd09711@fpt.edu.vn",
    to: `${email}`,
    subject: "Spring Tide Diamond",
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.use("/uploads", express.static(uploadDir));

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
