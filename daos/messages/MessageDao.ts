
import MessageDaoI from "../../interfaces/messages/MessageDao";
import { json } from "body-parser";
import Message from "../../models/messages/Message";
import MessageModel from "../../mongoose/messages/MessageModel";


export default class MessageDao implements MessageDaoI {

    async userMessageAnotherUser(msg : Message): Promise<Message> {
        const new_message : any = await MessageModel.create(msg)
        return new_message;
    }

    async userDeletesMessageWithAnotherUser(msg : any): Promise<any> {
        return await MessageModel.deleteOne({_id: msg._id});
    }

    async findAllMessagesSent(uid: string): Promise<Message[]> {
        return await MessageModel.find({from : uid})
    }

    async findAllMessagesRcvd(uid: string): Promise<Message[]> {
        return await MessageModel.find({to : uid})
    }
   
}