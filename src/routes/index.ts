import { Router } from 'express';



import fee from './transaction';


const router = Router();

router.use('/fee', fee);


export default router;

