import { StatusCodes } from "http-status-codes";
import jsonwebtoken from "jsonwebtoken";
import { secret } from "./settings.js";
import { User } from "./userModels.js";

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
 
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ status: "failed", message: "unknown user" });
      }
      if (password !== user.password) {
        return res.status(StatusCodes.FORBIDDEN).json({ status: "failed", message: "wrond password" });
      }

      const token = jsonwebtoken.sign({ id: user._id, username }, secret);

      return res.json({ token })
    } catch(e) {
      console.log(e);
      res.status(StatusCodes.BAD_REQUEST).json({ status: "failed", message: "something went wrong" });
    }
  }
  async registration(req, res) {
    try { 
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ status: "failed", message: "created before" });
      }

      await new User({ username, password }).save();

      return res.json({ mes: "user created" })
    } catch(e) {
      console.log(e);
      res.status(StatusCodes.BAD_REQUEST).json({ status: "failed", message: "something went wrong" });
    }
  }
}

export const authController = new AuthController();