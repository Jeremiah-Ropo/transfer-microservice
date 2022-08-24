import { Request, Response, NextFunction } from "express";

import {UserService} from '../../services/user'


class UserController{
    constructor(
        private readonly userService: UserService = new UserService()
    ){
        this.login = this.login.bind(this);
    }

    async login(req:Request, res:Response, next:NextFunction){
        try{
            let body = req.body;
            let result = await this.userService.logIn(body)
            return res.customSuccess(200, result)
        }catch(error){
            return next(error)
        }
    }

}