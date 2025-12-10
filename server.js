import config from "./server/config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  });

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to StackByte Incident Management System – CI/CD demo is working.",
  });
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Using MongoDB URI:", config.mongoUri);
  console.info("Server started on port %s.", config.port);
});


//log
const PORT = config.port;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Using MongoDB URI:", config.mongoUri);
  console.info("Server started on port %s.", PORT);
});
