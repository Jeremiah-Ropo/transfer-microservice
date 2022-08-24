import { getModelForClass, modelOptions, prop, DocumentType, mongoose, Ref } from "@typegoose/typegoose";
// import { User } from "./User";

@modelOptions({
  schemaOptions: {
    versionKey: false,
    toJSON: {
      transform: (doc: DocumentType<authentication>, ret) => {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
})

class authentication {

  @prop({ unique: true, required: true })
  ipAddress:string;
  
  @prop({ unique: true, required: true })
  serviceEmail:string;

  @prop({default:""})
  token:string;

  @prop({ unique: true, required: true })
  servicePassword:String;

}

const authenticationModel = getModelForClass(authentication);

export { authenticationModel, authentication }
