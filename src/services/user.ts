import axios from "axios";
import { Service } from "typedi";

import { UserModel } from "models/user";
import { CustomError } from "utils/response/custom-error/CustomError";

@Service()

export class UserService {
    
    async logIn(body){
        try{
            const userData = {
                clientId: body.clientId,
                amount:body.amount,
                default:body.true,
            }
            const newUser = await UserModel.create(userData);
            newUser.save();
            return newUser;
        }catch(error){
            const customError = new CustomError(404, "Raw", "Not allowed", null, error)
            throw customError
        }
    }
}