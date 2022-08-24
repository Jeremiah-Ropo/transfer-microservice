
import { Request, Response, NextFunction } from 'express';

import { AccountService } from '../../services/transaction'


class AccountController{
  constructor(

    private readonly accountService: AccountService = new AccountService()

  ){
    this.create = this.create.bind(this)
    
  }
 
  async create(req: Request, res: Response, next: NextFunction){
    try{

      const body = req.body;
      let result = await this.accountService.transfer(body)
      return res.customSuccess(200, {data:result})

    } catch (err) {
      return next(err);
    } 
  }

}

export default new AccountController()

