import {Request, Response, NextFunction} from "express";
import moment from "moment";

import { CustomError } from "../../../utils/response/custom-error/CustomError";

import { UserModel } from "../../../models/user";
import { ErrorValidation } from "../../../utils/response/custom-error/types";



export const limitTransfer = async (req:Request, res:Response, next:NextFunction) => {
    const amount = req.body.amount;
    const limitPerAmount:number = 5;
    const today = moment().toString();

    const Account = await UserModel.findOne({clientId:req.body.clientId})
 
    const limitError: ErrorValidation[] = [];

    if(today && Account.default == true){
        if(amount > limitPerAmount){
            limitError.push({limitTransactionError:` You can't make more than ${limitPerAmount} per day.`})
        }
    }

    if(limitError.length !== 0 ){
        const limiterError = new CustomError(400, 'Validation', 'Transfer limiter error', null, null, limitError);
        return next(limiterError);
    }

    return next()   

}
