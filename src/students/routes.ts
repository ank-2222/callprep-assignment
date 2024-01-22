import { Router } from "express";
import UsersAuthController from "./controller";

const router: Router = Router();

const { execute } = new UsersAuthController();

router.post("/createstudent", execute);    //routes
router.post("/marksentry1/:studentId", execute);
router.post("/marksentry2/:studentId", execute);
router.get("/getallstudents/:classId", execute);
router.get("/getclassdetails/:classId", execute);

export default router;
