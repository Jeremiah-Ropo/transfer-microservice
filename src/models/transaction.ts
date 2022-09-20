import { getModelForClass, modelOptions, prop, DocumentType, Ref} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    versionKey: false,
    toJSON: {
      transform: (doc: DocumentType<Fee>, ret) => {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
})

class Fee {
  @prop({default:"local transfer"})
  feeType:string;

  @prop()
  fee:number;

  @prop()
  minAmount: number;

  @prop()
  maxAmount: number;

}

const FeeModel = getModelForClass(Fee);

export { FeeModel, Fee }
