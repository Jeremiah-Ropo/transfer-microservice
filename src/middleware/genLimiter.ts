import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import { CustomError } from '../utils/response/custom-error/CustomError';

export const checkLimiter = (req: Request, res: Response, next: NextFunction) => {
    let { clientId } = req.body
    axios.put(
        "https://voguepay-local.herokuapp.com/core-engine/v1/user/secretkey",
        {key: clientId}
    ).then((response) => {
        console.log(response)
        return next()

    }).catch(() => {
        const customError = new CustomError(
            400,
            'Validation',
            'merchant validation error',
            null,
            null
        );
        return next(customError);
    })
}