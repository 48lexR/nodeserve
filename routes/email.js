var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");

const sendMail = (user, name, pass, callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "uncchspoons@gmail.com",
      pass: "wnbc axgd gbcp gppl",
    },
  });
  const mailOptions = {
    from: `"UNCCH Spoons", "uncchspoons@gmail.com"`,
    to: `<${user}>`,
    subject: "Cheese?",
    html: `Hi there, ${name}.
      Your password is ${pass} for uncchspoons.net.
      
      All the best,
      Cage Bullard,
      DO NOT REPLY TO THIS EMAIL ACCOUNT: Please email cbull358@gmail.com`,
  };
  transporter.sendMail(mailOptions, callback);
};

router.get("/", (req, res) => {
  console.log("Cannot GET /");
  res.send("No");
  res.status(400);
});

router.post("/", bodyParser.json(), async (req, res) => {
  let user = req.body;
  sendMail(user.uname, user.name, user.pword, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
    } else {
      console.log(info);
      res.send("SNAFU\n");
      res.status(200);
    }
  });
});

module.exports = router;
