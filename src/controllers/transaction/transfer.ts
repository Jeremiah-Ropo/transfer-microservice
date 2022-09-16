
import { Request, Response, NextFunction } from 'express';

import { TransferService } from '../../services/transaction'


class AccountController{
  constructor(

    private readonly transferService: TransferService = new TransferService()

  ){
    this.localFee = this.localFee.bind(this)
    this.virtualAccountFee = this.virtualAccountFee.bind(this)
    
  }
 
  async localFee(req: Request, res: Response, next: NextFunction){
    try{
      const body = req.body;
      let result = await this.transferService.localFee(body)
      return res.customSuccess(200, {data:result})
    } catch (err) {
      return next(err);
    } 
  }

  async virtualAccountFee(req:Request, res:Response, next:NextFunction){
    try{
      const body = req.body;
      let result = await this.transferService.virtualAcccountFee(body)
      return res.customSuccess(200, {data:result})
    }catch(err){
      return next(err);
    }
  }
  

}

export default new AccountController()

