import axios from "axios";
import moment from "moment";
import { Service } from "typedi";

import { CustomError } from '../utils/response/custom-error/CustomError';
import crypto from 'crypto'


@Service()
export class TransferService {

  async localFee(body: any ){
    
    try {

      if(body.amount < 5000 ){
        return 10
      }
      else if(body.amount >5001 && body.amount < 50000){
        return 25
      }
      return 50
    } catch (err) {
      const customError = new CustomError(500, 'Raw', `Something wrong.`, null, err);
      throw customError;
    }
  }

  async virtualAcccountFee(body: any ){
    
    try {

      const fee = (0.01 * parseFloat(body.amount)) + parseFloat(body.amount)
      return fee;

    } catch (err) {
      const customError = new CustomError(500, 'Raw', `Something wrong.`, null, err);
      throw customError;
    }
  }
}



