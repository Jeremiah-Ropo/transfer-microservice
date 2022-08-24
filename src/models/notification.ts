import { getModelForClass, modelOptions, prop, DocumentType, Ref } from "@typegoose/typegoose";
import { Transaction } from "./transaction";

@modelOptions({
    schemaOptions: {
        versionKey: false,
        toJSON: {
            transform: (doc: DocumentType<Notification>, ret) => {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
})
class Notification {

    @prop({autopopulate:true, ref:() => Transaction})
    transferDetails:Ref<Transaction>[];

    @prop({default:""})
    status: string;

    @prop({default:new Date().toUTCString()})
    date:Date;

}
const notificationModel = getModelForClass(Notification)
export { Notification, notificationModel }