import express from "express";
import { login, logout, register, updateProfile,generateResume, uploadResume  } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").post(updateProfile);

router.route("/generate-resume").post(generateResume);  // AI resume generation


export default router;

    
