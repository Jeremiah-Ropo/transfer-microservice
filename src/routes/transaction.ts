import { Router } from "express";

import AccountController from '../controllers/transaction/transfer'

const router = Router();

router.get("/virtualfee", AccountController.virtualAccountFee)
router.get("/localfee", AccountController.localFee);
router.post("/create", AccountController.create);
router.get("/findone", AccountController.findOne);
router.get("/find", AccountController.find);
router.post("/delete", AccountController.delete);
router.post("/update", AccountController.update);


export default router;
