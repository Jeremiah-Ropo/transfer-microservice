import axios from "axios";
import moment from "moment";
import { Service } from "typedi";

import { CustomError } from '../utils/response/custom-error/CustomError';
import crypto from 'crypto'
import { FeeModel } from "../models/transaction";


@Service()
export class TransferService {

  async create(body: any) {
    try {
      let transfee = await FeeModel.create({
        feeType: body.feeType,
        maxAmount: body.maxAmount,
        minAmount: body.minAmount,
        fee: body.fee
      })

      return transfee;

    } catch (err) {
      const customError = new CustomError(500, 'Raw', `Can't saved`, null, null, err)
      throw customError;
    }

  }

  async findOne(body: any) {
    try {
      let findOne = await FeeModel.findOne(body)

      return findOne;

    } catch (err) {
      const customError = new CustomError(500, 'Raw', `Result not found`, null, null, err)
      throw customError;
    }

  }

  async find() {
    try {
      let find = await FeeModel.find({})
      return find;
    } catch (err) {
      const customError = new CustomError(500, 'Raw', `Result not found`, null, null, err)
      throw customError;
    }

  }

  async update(body: any) {
    try {
      let update = await FeeModel.findOneAndUpdate(
        { feeType: body.feeType },
        {
          feeType: body.newFeeType,
          maxAmount: body.maxAmount,
          minAmount: body.minAmount,
          fee: body.fee
        },
        { new: true }
      )

      return update;

    } catch (err) {
      const customError = new CustomError(500, 'Raw', `Can't update`, null, null, err)
      throw customError;
    }

  }

  async delete(body: any) {
    try {
      await FeeModel.findOneAndDelete(body)

      return { message: "Deleted Successfully" };

    } catch (err) {
      const customError = new CustomError(500, 'Raw', `Can't delete ${body.fee}`, null, null, err)
      throw customError;
    }

  }
  async localFee(query: any) {

    try {

      if (query.amount <= 5000) {
        const getFee = await FeeModel.findOne({maxAmount:5000});
        return getFee.fee
      }
      if (query.amount > 5001 && query.amount <= 50000) {
        const getFee = await FeeModel.findOne({maxAmount:50000, minAmount:5001})
        return getFee.fee
      }
      const getFee = await FeeModel.findOne({minAmount:50000})
      return getFee.fee;


    } catch (err) {
      const customError = new CustomError(500, 'Raw', `Something wrong.`, null, err);
      throw customError;
    }
  }

  async virtualAcccountFee(query: any) {

    try {
      if (query.amount <= 5000) {
        const getFee = await FeeModel.findOne({feeType:query.feeType, maxAmount:5000});
        // console.log(getFee.fee)
        const fee = getFee.fee * parseFloat(query.amount)
        // console.log(fee)

        return fee;
      }
      if (query.amount > 5001 && query.amount <= 50000) {
        const getFee = await FeeModel.findOne({feeType:query.feeType, maxAmount:50000, minAmount:5001})
        console.log(getFee.fee)

        const fee = getFee.fee * parseFloat(query.amount)
        console.log(fee)

        return fee;
      }
      const getFee = await FeeModel.findOne({feeType:query.feeType, minAmount:50000})
      // console.log(getFee.fee)

      const fee = getFee.fee * parseFloat(query.amount)
      return fee

    } catch (err) {
      const customError = new CustomError(500, 'Raw', `Something wrong.`, null, err);
      throw customError;
    }
  }
}



