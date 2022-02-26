const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/timer_random", (req, res) => {
//   let output;
//   const pythonOutput = spawn("python", ["./python_scripts/timer_random.py"]);
//   pythonOutput.stdout.on("data", (data) => {
//     // output = data.toString();
//     output = JSON.parse(data);
//   });
//   pythonOutput.on("close", (code) => {
//     console.log("code", code);
//     console.log(typeof output);
//     console.log(output);
//     res.status(200).json(output);
//   });
// });

// app.get("/fer", (req, res) => {
//   let output;
//   const ferOutput = spawn("python", ["./backend/python_scripts/fer.py"]);
//   ferOutput.stdout.on("data", (data) => {
//     // output = data.toString();
//     output = JSON.parse(data);
//   });
//   ferOutput.on("close", (code) => {
//     if (code === 0) {
//       res.status(200).json(output);
//     } else {
//       res.status(400);
//       throw new Error("Somethings wrong with the script, check the logs");
//     }
//     // console.log(typeof output);
//     // console.log(output);
//   });
// });

// api routes
app.use("/api/fer", require("./routes/ferRoutes"));

// custom middleware
app.use(errorHandler);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "dist", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("Please set to production mode");
  });
}

app.listen(port, () => console.log(`Server start listening on port ${port}!`));
