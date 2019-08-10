const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

//body paser middle ware
app.use(express.json());

//DB config
const db = config.get("mongoURI");

//conect Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

// use Routes;
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/send", require("./routes/api/send"));
app.use("/api/makeAppoint", require("./routes/api/makeAppoint"));

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
