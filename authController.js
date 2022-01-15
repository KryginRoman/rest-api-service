class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      console.log({ username, password });

      return res.json({ mes: "user loggined" })
    } catch(e) {
      console.log(e);
      res.status(400).json({ status: "failed", message: "something went wrong" });
    }
  }
  async registration(req, res) {
    try { 
      return res.json({ mes: "user created" })
    } catch(e) {
      console.log(e);
      res.status(400).json({ status: "failed", message: "something went wrong" });
    }
  }
}

export const authController = new AuthController();