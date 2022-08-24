import { Router } from 'express';

// import { login} from '../controllers/auth';
import { checkKey } from '../middleware/checkKey';
import { validatorLogin, validatorRegister, validatorChangePassword } from '../middleware/validation/auth';

const router = Router();

// router.post('/login', [validatorLogin], login);

export default router;
