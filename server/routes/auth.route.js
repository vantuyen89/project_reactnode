import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";


const routerAuth = Router();
routerAuth.post("/signup", signup)
routerAuth.post("/signin", signin)
export default routerAuth