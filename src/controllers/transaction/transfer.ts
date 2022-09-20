
import { Request, Response, NextFunction } from 'express';

import { TransferService } from '../../services/transaction'


class AccountController{
  constructor(

    private readonly transferService: TransferService = new TransferService()

  ){
    this.create = this.create.bind(this)
    this.findOne = this.findOne.bind(this)
    this.find = this.find.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.localFee = this.localFee.bind(this)
    this.virtualAccountFee = this.virtualAccountFee.bind(this)
    
  }
 
  async create(req: Request, res: Response, next: NextFunction){
    try{
      const body = req.body;
      let result = await this.transferService.create(body)
      return res.customSuccess(200, {data:result})
    } catch (err) {
      return next(err);
    } 
  }


  async findOne(req: Request, res: Response, next: NextFunction){
    try{
      const body = req.body;
      let result = await this.transferService.findOne(body)
      return res.customSuccess(200, {data:result})
    } catch (err) {
      return next(err);
    } 
  }

  async find(req: Request, res: Response, next: NextFunction){
    try{
      let result = await this.transferService.find()
      return res.customSuccess(200, {data:result})
    } catch (err) {
      return next(err);
    } 
  }

  async update(req: Request, res: Response, next: NextFunction){
    try{
      const body = req.body;
      let result = await this.transferService.update(body)
      return res.customSuccess(200, {data:result})
    } catch (err) {
      return next(err);
    } 
  }

  async delete(req: Request, res: Response, next: NextFunction){
    try{
      const body = req.body;
      let result = await this.transferService.delete(body)
      return res.customSuccess(200, {data:result})
    } catch (err) {
      return next(err);
    } 
  }

  async localFee(req: Request, res: Response, next: NextFunction){
    try{
      const query = req.query;
      let result = await this.transferService.localFee(query)
      return res.customSuccess(200, {data:result})
    } catch (err) {
      return next(err);
    } 
  }

  async virtualAccountFee(req:Request, res:Response, next:NextFunction){
    try{
      const query = req.query;
      let result = await this.transferService.virtualAcccountFee(query)
      return res.customSuccess(200, {data:result})
    }catch(err){
      return next(err);
    }
  }

}

export default new AccountController()

