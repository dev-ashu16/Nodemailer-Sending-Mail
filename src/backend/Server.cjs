const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
// CORS configuration to allow requests from the frontend
app.use(cors({
  origin: "http://localhost:5173" // Allow requests from this origin
}));
app.use(express.json());
const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
     user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
    debug: true  
});
app.post("/api/send", (req, res) => {
  console.log("Received request with body:", req.body);
  const mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.message
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);  
      return res.status(500).send({ error: error.toString() });
    }
    console.log("Email sent successfully:", info);
    res.status(200).send("Email sent successfully");
  });
});
const port = 3030;
app.listen(port, () => console.log(`Server running on port ${port}`));