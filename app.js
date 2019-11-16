const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = (module.exports.io = require("socket.io").listen(server));
const { TimeSeries } = require("./models");

//Get Environment Variables
require("dotenv").config();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to the database successfully"))
  .catch(err => console.log(err));

//Socket IO Connection Client
io.on("connection", async socket => {
  const data = await TimeSeries.find({});
  socket.emit("init_data", data);
  socket.on("add_number", async data => {
    const savedData = await new TimeSeries({
      number: data.number,
      timestamp: Date.now()
    }).save();
    io.emit("new_number_added", savedData);
  });
});

//Import Routes
const numberRoutes = require("./routes/number");
app.use("/api/number", numberRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Port started at ${process.env.PORT}`);
});
