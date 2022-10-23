/**
 * @file Declares the apis for Like related operation management
 */
import {Request, Response} from "express";

export default interface LikeController {
    addLikeToTuit(req: Request, res: Response): void;
    removeLikeToTuit(req: Request, res: Response): void;
    findAllTuitsLikedByUser(req: Request, res: Response): void;
    findAllUsersByTuitLike(req: Request, res: Response): void;
}