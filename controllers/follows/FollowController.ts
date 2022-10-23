import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import FollowDao from "../../daos/follows/FollowDao";
import LikeDao from "../../daos/likes/LikeDao";
import FollowControllerI from "../../interfaces/follows/FollowController";

export default class FollowController implements FollowControllerI {
   app: Express;
   followDao: FollowDao;

   constructor(app: Express, followDao: FollowDao) {
       this.app = app;
       this.followDao = followDao;
       
       this.app.post('/users/:uid/follows/:uid2', this.userFollowsAnotherUser);
       this.app.delete('/users/:uid/follows/:uid2', this.userUnfollowsAnotherUser);
       this.app.get('/users/:uid/followers', this.findAllUsersFollowersByUser);
       this.app.get('/users/:uid/following', this.findAllFollowersOfUser);
   }
    userFollowsAnotherUser = (req: Request, res: Response) =>
        this.followDao.userFollowsAnotherUser(req.params.uid, req.params.uid2)
        .then(follow => res.json(follow));

    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        this.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.uid2)
        .then(status => res.json(status));

    findAllUsersFollowersByUser = (req: Request, res: Response) =>
        this.followDao.findAllUsersFollowedByUser(req.params.uid)
        .then(users => res.json(users));

    findAllFollowersOfUser = (req: Request, res: Response) =>
        this.followDao.findAllFollowersOfUser(req.params.uid)
        .then(users => res.json(users));

    

}
