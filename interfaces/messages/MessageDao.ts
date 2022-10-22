import Message from "../../models/messages/Message";

export default interface MessageDao {
   userMessageAnotherUser(msg : Message): Promise<Message>;
   userDeletesMessageWithAnotherUser(msg : Message): Promise<any>;
   findAllMessagesSent(uid: string): Promise<Message[]>;
   findAllMessagesRcvd(uid: string): Promise<Message[]>;
}
