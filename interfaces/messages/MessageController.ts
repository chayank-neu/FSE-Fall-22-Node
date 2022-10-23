/**
 * @file Declares the apis for Message related operation management
 */
import {Request, Response} from "express";

export default interface MessageController {
    userMessageAnotherUser(req: Request, res: Response): void;
    userDeletesMessageWithAnotherUser(req: Request, res: Response): void;
    findAllMessagesSent(req: Request, res: Response): void;
    findAllMessagesRcvd(req: Request, res: Response): void;
}