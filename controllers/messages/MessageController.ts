import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import MessageDao from "../../daos/messages/MessageDao";
import MessageControllerI from "../../interfaces/messages/MessageController";

export default class MessageController implements MessageControllerI {
   app: Express;
   messageDao: MessageDao;

   constructor(app: Express, messageDao: MessageDao) {
       this.app = app;
       this.messageDao = messageDao;
       
       this.app.post('/users/:uid/messages/:uid2', this.userMessageAnotherUser);
       this.app.delete('/users/:uid/messages/:uid2', this.userDeletesMessageWithAnotherUser);
       this.app.get('/users/:uid/sent-messages', this.findAllMessagesSent);
       this.app.get('/users/:uid/rcvd-messages', this.findAllMessagesRcvd);
   }
   
    userMessageAnotherUser = (req: Request, res: Response) =>
        this.messageDao.userMessageAnotherUser(req.body)
        .then(msg => res.json(msg));

    userDeletesMessageWithAnotherUser = (req: Request, res: Response) =>
        this.messageDao.userDeletesMessageWithAnotherUser(req.body)
        .then(status => res.json(status));

    findAllMessagesSent = (req: Request, res: Response) =>
        this.messageDao.findAllMessagesSent(req.params.uid)
        .then(msgs => res.json(msgs));

    findAllMessagesRcvd = (req: Request, res: Response) =>
        this.messageDao.findAllMessagesRcvd(req.params.uid)
        .then(msgs => res.json(msgs));

}
