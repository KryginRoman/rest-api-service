import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import router from "./authRouter.js";
import { secret } from "./settings.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", router);
app.use((req, res, next) => {
	try {
		const token = req.headers.authorization && req.headers.authorization.split("Bearer ")[1];
	
	  if (!token || !jsonwebtoken.verify(token, secret)) {
	  	return res.status(StatusCodes.UNAUTHORIZED).json({ status: "failed", message: ReasonPhrases.UNAUTHORIZED });
	  }

	  next();
	} catch(e) {
		console.log(e);
	}
});

// app.get("*", function(req, res) {
//   res.status(200).json("Rest api service");
// });

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(process.env.PORT || 3000, () => {
      console.log("Connected");
    })
  } catch(e) {
    console.error(e);
  }
}

startServer();