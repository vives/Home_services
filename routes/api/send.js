const config = require("config");
const express = require("express");
const router = express.Router();

//Item Model

const SendMessage = require("../../models/SendMessage");

// @route  GET api/send
// @desc   Get All Massages
// @access Public
router.get("/", (req, res) => {
  SendMessage.find()
    .sort({ date: -1 })
    .then(sendMessage => res.json(sendMessage));
});

// @route  POST api/send
// @desc   Send Message
// @access Public
router.post("/", (req, res) => {
  //Simple Validation
  //   if (!req.body.name || !req.body.email) {
  //     return res.status(400).json({ msg: "Please enter required values" });
  //   }

  console.log(req.body);
  const { name, email, message } = req.body;

  //Simple Validation
  if (!name || !email) {
    return res.status(400).json({ msg: "Please enter all required values" });
  }
  const request = new SendMessage({
    name,
    email,
    message
  });
  request.save().then(sendMessage =>
    res.json({
      Info: {
        name: sendMessage.name,
        email: sendMessage.email,
        message: sendMessage.message
      }
    })
  );
});

// // @route  DELETE api/items/:id
// // @desc   Delete   A POST
// // @access Private
// router.delete("/:id", auth, (req, res) => {
//   Item.findById(req.params.id)
//     .then(item => item.remove().then(() => res.json({ success: true })))
//     .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;
