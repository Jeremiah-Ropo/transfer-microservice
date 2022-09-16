import { Router } from "express";

import AccountController from '../controllers/transaction/transfer'

const router = Router();

router.post("/virtualfee", AccountController.virtualAccountFee)
router.post("/localfee", AccountController.localFee);


export default router;
