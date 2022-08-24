import { Router } from 'express';

import auth from './auth';

import users from './transaction';


const router = Router();

router.use('/auth', auth);
router.use('/virtual', users);


export default router;

