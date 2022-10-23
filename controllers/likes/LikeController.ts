import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import LikeDao from "../../daos/likes/LikeDao";
import LikeControllerI from "../../interfaces/likes/LikeController";

export default class LikeController implements LikeControllerI {
   app: Express;
   likeDao: LikeDao;

   constructor(app: Express, likeDao: LikeDao) {
       this.app = app;
       this.likeDao = likeDao;
       
       this.app.post('/users/:uid/likes/:tid', this.addLikeToTuit);
       this.app.delete('/users/:uid/likes/:tid', this.removeLikeToTuit);
       this.app.get('/users/:uid/likes', this.findAllTuitsLikedByUser);
       this.app.get('/tuits/:tid/likes', this.findAllUsersByTuitLike);
   }
    addLikeToTuit = (req: Request, res: Response) =>
        this.likeDao.addLikeToTuit(req.params.uid, req.params.tid)
        .then(like => res.json(like));

    removeLikeToTuit = (req: Request, res: Response) =>
        this.likeDao.removeLikeToTuit(req.params.uid, req.params.tid)
        .then(status => res.json(status));

    findAllTuitsLikedByUser = (req: Request, res: Response) =>
        this.likeDao.findAllTuitsLikedByUser(req.params.uid)
        .then(tuits => res.json(tuits));

    findAllUsersByTuitLike = (req: Request, res: Response) =>
        this.likeDao.findAllUsersByTuitLike(req.params.tid)
        .then(users => res.json(users));

    

}
