import { Router } from "express";
import { addATenantController, loginController } from "../controller/index.js";


const router = Router()

router.post('/add', addATenantController)
router.post('/login', loginController)

export default router