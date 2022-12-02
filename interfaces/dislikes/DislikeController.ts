/**
 * @file Declares the apis for disLike related operation management
 */
import {Request, Response} from "express";

export default interface DislikeController {
    addDislikeToTuit(req: Request, res: Response): void;
    removeDislikeToTuit(req: Request, res: Response): void;
    findAllTuitsDislikedByUser(req: Request, res: Response): void;
    findAllUsersByTuitDislike(req: Request, res: Response): void;
}