/**
 * @file Declares the apis for Follow related operation management
 */
import {Request, Response} from "express";

export default interface FollowController {
    userFollowsAnotherUser(req: Request, res: Response): void;
    userUnfollowsAnotherUser(req: Request, res: Response): void;
    findAllUsersFollowersByUser(req: Request, res: Response): void;
    findAllFollowersOfUser(req: Request, res: Response): void;
}