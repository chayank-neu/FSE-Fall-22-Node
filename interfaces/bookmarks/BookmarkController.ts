import {Request, Response} from "express";

export default interface BookmarkController {
    userBookmarksTuit(req: Request, res: Response): void;
    userUnBookmarksTuit(req: Request, res: Response): void;
    findAllTuitsBookmarkedByUser(req: Request, res: Response): void;
}