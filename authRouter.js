import { Router } from "express";
import { authController } from "./authController.js"

const router = new Router();

router.post("/login", function(req, res) {
  authController.login(req, res);
});

router.post("/registration", function(req, res) {
  authController.registration(req, res);
});

export default router;