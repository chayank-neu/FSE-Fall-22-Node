/**
 * @file Implements management and  data storage of messages.
 */
import MessageDaoI from "../../interfaces/messages/MessageDao";
import { json } from "body-parser";
import Message from "../../models/messages/Message";
import MessageModel from "../../mongoose/messages/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage of messages
 * @implements {MessageDaoI} MessageDaoI
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {

    private static messageDao:MessageDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null){
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    /**
     * Creates a message instance into messages collection in the database
     * @param {Message} msg the content(instance) to be inserted into the database
     * @returns {Promise} To be notified when the message instance is created in the database
     */
    async userMessageAnotherUser(msg : Message): Promise<Message> {
        const new_message : any = await MessageModel.create(msg)
        return new_message;
    }

    /**
     * Deletes a message instance from messages collection in the database
     * @param {Message} msg message JSON object for delete
     * @returns {Promise} To be notified when the message instance is removed from the database
     */
    async userDeletesMessageWithAnotherUser(msg : any): Promise<any> {
        return await MessageModel.deleteOne({_id: msg._id});
    }

    /**
     * Retrieves all the messages sent by a user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the messages are retrieved from database
     */
    async findAllMessagesSent(uid: string): Promise<Message[]> {
        return await MessageModel.find({from : uid})
    }

    /**
     * Retrieves all the messages received by a user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the messages are retrieved from database
     */
    async findAllMessagesRcvd(uid: string): Promise<Message[]> {
        return await MessageModel.find({to : uid})
    }
   
}