import axios from "axios";
import { notificationModel } from "models/notification";
import { UserModel } from "models/user";
import moment from "moment";
import { Service } from "typedi";

import {Transaction, transactionModel} from '../models/transaction';

import { CustomError } from '../utils/response/custom-error/CustomError';



@Service()
export class TransferService {
 
  async transfer(body: any ){
    
    try {

    
      let transferData = {
        clientId : body.clientId,
        amount : body.amount,
        currency : body.currency,
        beneficialDetails : body.beneficialDetails
      }
      
      let payment = await axios.post('https://voguepay/herokuapp.com/initialise/', transferData)


      let clientId = await UserModel.findOne({clientId: body.clientId})
      let today = moment();

      const TotalAmount = clientId.amount - body.amount;

      // let baseUrl = body.data.payment_url;
      // let { config } = await axios.get(baseUrl)
      // console.log(config.data);
      // let data = config.data.data;
      
      // if( data.status !== 'successful'){
      //   return { message: "Transaction declined"}
      // }
      await transactionModel.create({
          clientId:body.clientId,
          valueDate: today,
          currency: body.currency,
          amount: body.amount,
          transactionId: body.transactionId,
          status:body.status
      });
      
      await UserModel.findOneAndUpdate(
          {clientId: body.clientId}, 
          {
          $set:{
          amount:TotalAmount,
          transaction:body.transaction,
          updateAt: Date.now()
          }
      }, {new:true})
      let notification_payload = {
        transferDetails: body.transactionId,
        status: body.status,
        
      }
      await notificationModel.create(notification_payload);
      
      return {message: "transfer successful"}
    } catch (err) {
    
      const customError = new CustomError(500, 'Raw', `Account can't be saved.`, null, err);
      throw customError;
      
    }
  }


}



