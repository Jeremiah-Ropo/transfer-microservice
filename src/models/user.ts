import { getModelForClass, modelOptions, prop, DocumentType} from "@typegoose/typegoose";



@modelOptions({
  schemaOptions: {
    versionKey: false,
    toJSON: {
      transform: (doc: DocumentType<User>, ret) => {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
})

class User {

  @prop({ required:true })//The user ID of an User
  clientId:string;

  @prop({default:""})
  amount:number;

  @prop({default:true})
  default:boolean;

  @prop({default:new Date().toUTCString()})
  createdDate:Date;
}

const UserModel = getModelForClass(User);

export { UserModel, User }
