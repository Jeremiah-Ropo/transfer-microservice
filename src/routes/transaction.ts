import { Router } from "express";

import AccountController from '../controllers/transaction/transfer'

const router = Router();

router.post("/transfer", AccountController.create)

export default router;
