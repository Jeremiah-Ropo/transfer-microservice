import { getModelForClass, modelOptions, prop, DocumentType, Ref} from "@typegoose/typegoose";
import { Currency } from "types/transaction";
import { User } from "./user";


enum Status {
  Failed = 'Failed',
  succesful = 'Succesful',
  completed = 'Completed' 
}


@modelOptions({
  schemaOptions: {
    versionKey: false,
    toJSON: {
      transform: (doc: DocumentType<Transaction>, ret) => {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
})

class Transaction {

  @prop({ default:"me/to/you/purpose"})//Some details why the user used their wallet.
  narrative:string

  @prop({default: new Date().toUTCString()}) //Date when the Transaction is successful
  transactionDate:Date;
  
  @prop({default: new Date().toUTCString()}) //Date when the Transaction was made.
  valueDate:Date;
  
  @prop({ default:""})//Transaction reference code.
  transactionReference:string

  @prop({required:true, default:"NGN"}) //The currency spent
  currency:Currency;

  @prop({  required: true })//How much money was the Transaction
  amount:number;

  @prop({ required:true}) //balance after Transaction
  balAfterTrans:number;

  @prop({ default:'TRF'})// local transfer.
  category:string;

  @prop({ default:"succesful", enum:Object.values(Status)})//status of the Transaction(failed or not).
  status:string;
  
  @prop({ref:()=> User})
  clientId:Ref<User>;
}

const transactionModel = getModelForClass(Transaction);

export { transactionModel, Transaction }
