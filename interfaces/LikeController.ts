import {Request, Response} from "express";

export default interface TuitController {
    addLikeToTuit(req: Request, res: Response): void;
    removeLikeToTuit(req: Request, res: Response): void;
    findAllTuitsLikedByUser(req: Request, res: Response): void;
    findAllUsersByTuitLike(req: Request, res: Response): void;
}