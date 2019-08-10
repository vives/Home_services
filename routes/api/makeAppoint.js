const config = require("config");
const express = require("express");
const router = express.Router();

//Item Model

const MakeAppoint = require("../../models/MakeAppoint");

// @route  GET api/makeAppoint
// @desc   Get all appointments
// @access Public
router.get("/", (req, res) => {
  MakeAppoint.find()
    .sort({ date: -1 })
    .then(makeAppoint => res.json(makeAppoint));
});

// @route  POST api/makeAppoint
// @desc   Make Appointment
// @access Public
router.post("/", (req, res) => {
  console.log(req.body);
  const { address, dataAndTime, constraints, work } = req.body;

  //Simple Validation
  if (!req.body.address || !req.body.dataAndTime || !req.body.work) {
    return res.status(400).json({ msg: "Please enter required values" });
  }
  const request = new MakeAppoint({
    address,
    dataAndTime,
    constraints,
    work
  });
  request.save().then(makeAppoint =>
    res.json({
      Info: {
        address: makeAppoint.address,
        dataAndTime: makeAppoint.dataAndTime,
        constraints: makeAppoint.constraints,
        work: makeAppoint.work
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
