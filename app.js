import express from "express";
import mongoose from "mongoose";
import router from "./authRouter.js";

const PORT = process.env.PORT || 3000;
const DB_URL = "mongodb+srv://user1:ejVAmLFa7RWb5r%40@cluster0.yodgz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use("/auth", router);

// app.get("*", function(req, res) {
//   res.status(200).json("Rest api service");
// });

async function startServer() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log("Connected");
    })
  } catch(e) {
    console.error(e);
  }
}

startServer();