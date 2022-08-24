
import { Request, Response, NextFunction } from 'express';

import { TransferService } from '../../services/transaction'


class AccountController{
  constructor(

    private readonly transferService: TransferService = new TransferService()

  ){
    this.create = this.create.bind(this)
    
  }
 
  async create(req: Request, res: Response, next: NextFunction){
    try{

      const body = req.body;
      let result = await this.transferService.transfer(body)
      return res.customSuccess(200, {data:result})

    } catch (err) {
      return next(err);
    } 
  }

}

export default new AccountController()

