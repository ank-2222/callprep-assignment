import { Router } from "express";
import UsersAuthController from "./controller";

const router: Router = Router();

const { execute } = new UsersAuthController();

router.get("/createclass", execute); //routes

export default router;
