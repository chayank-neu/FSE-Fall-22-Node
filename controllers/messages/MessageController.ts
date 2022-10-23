/**
 * @file Controller for handling messages
 */
import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import MessageDao from "../../daos/messages/MessageDao";
import MessageControllerI from "../../interfaces/messages/MessageController";

/**
 * @class This class implements the RESTful web service api for handling follows related operations.
 * @property {MessageDao} messageDao implementing the CRUD operations
 * @property {MessageController} messageController implementing the CRUD APIs
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates a singleton controller instance
     * @param {Express} app An express instance to declare the Web service api
     * @returns messageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post('/users/:uid/messages/:uid2', MessageController.messageController.userMessageAnotherUser);
            app.delete('/users/:uid/messages/:uid2', MessageController.messageController.userDeletesMessageWithAnotherUser);
            app.get('/users/:uid/sent-messages', MessageController.messageController.findAllMessagesSent);
            app.get('/users/:uid/rcvd-messages', MessageController.messageController.findAllMessagesRcvd);
        }
        return MessageController.messageController;
    }

    private constructor() {
    }

    /**
     * Inserts a message instance into messages collection in the database
     * @param {Request} req is the request from clients with
     * uid1 as primary key of user whos sends the message, uid2 as the primary key
     * of the user to whom the message is sent and message to be sent
     * @param {Response} res is the response to the client as JSON that contains
     * the message instance that was added in the database
     */
    userMessageAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessageAnotherUser(req.body)
        .then(msg => res.json(msg));

    /**
     * Deletes a message instance from the messages collection in the database
     * @param {Request} req is the request from clients with
     * message object in request body
     * @param {Response} res is the response to the client that contains the delete status
     */
    userDeletesMessageWithAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessageWithAnotherUser(req.body)
        .then(status => res.json(status));

    /**
     * Retrieves all the messages sent by a  user
     * @param {Request} req is the request from clients with uid as the primary
     * key of the user who has sent messages
     * @param {Response} res is the response to the client as JSON that contains messages list
     */
    findAllMessagesSent = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSent(req.params.uid)
        .then(msgs => res.json(msgs));

    /**
     * Retrieves all the messages received by a  user
     * @param {Request} req is the request from clients with uid as the primary
     * key of the user who has received messages
     * @param {Response} res is the response to the client as JSON that contains messages list
     */
    findAllMessagesRcvd = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesRcvd(req.params.uid)
        .then(msgs => res.json(msgs));

}
