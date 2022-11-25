/**
 * @file Controller for handling likes
 */

import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import LikeDao from "../../daos/likes/LikeDao";
import TuitDao from "../../daos/tuits/TuitDao";
import LikeControllerI from "../../interfaces/likes/LikeController";
import TuitController from "../tuits/TuitController";

/**
 * @class This class implements the RESTful web service api for handling likes related operations.
 * @property {LikeDao} likeDao implementing the CRUD operations
 * @property {LikeController} likeController implementing the CRUD APIs
 */
export default class LikeController implements LikeControllerI {
    private static likeDao:LikeDao = LikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static likeController: LikeController | null = null;

    /**
     * Creates a singleton controller instance
     * @param {Express} app An express instance to declare the Web service api
     * @returns likeController
     */
    public static getInstance = (app: Express): LikeController => {
        if(LikeController.likeController === null){
            LikeController.likeController = new LikeController();

            app.post('/users/:uid/likes/:tid', LikeController.likeController.addLikeToTuit);
            app.delete('/users/:uid/likes/:tid', LikeController.likeController.removeLikeToTuit);
            app.get('/users/:uid/likes', LikeController.likeController.findAllTuitsLikedByUser);
            app.get('/tuits/:tid/likes', LikeController.likeController.findAllUsersByTuitLike);
            app.put('/users/:uid/likes/:tid', LikeController.likeController.userTogglesTuitLikes);

        }
        return LikeController.likeController;
    }
    private constructor() {
    }

    /**
     * Inserts a new like instance into the likes collection in the database
     * @param {Request} req is the request from clients with tid as the tuit's primary key
     * and uid as the user's primary key
     * @param {Response} res is the response to the client as JSON which contains the like
     * that was inserted in the databases
     */
    addLikeToTuit = (req: Request, res: Response) =>
        LikeController.likeDao.addLikeToTuit(req.params.uid, req.params.tid)
        .then(like => res.json(like));

    /**
     * Deletes a like instance from the likes collection in the database
     * @param {Request} req is the request from clients with tid as the tuit's primary key
     * and uid as the user's primary key
     * @param {Response} res is the response to the client with delete status
     */
    removeLikeToTuit = (req: Request, res: Response) =>
        LikeController.likeDao.removeLikeToTuit(req.params.uid, req.params.tid)
        .then(status => res.json(status));

    /**
     * Retrieves all the tuits liked by a particular user
     * @param {Request} req is the request from clients with uid as the users primary key
     * @param {Response} res is the response to the client as JSON that contains tuits list
     */
    findAllTuitsLikedByUser = (req: Request, res: Response) =>
        LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
        .then(tuits => res.json(tuits));
    
    /**
     * Retrieves all the users that liked by a particular tuit
     * @param {Request} req is the request from clients with tid as the tuit's primary key
     * @param {Response} res is the response to the client as JSON which contains users list
     */
    findAllUsersByTuitLike = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersByTuitLike(req.params.tid)
        .then(users => res.json(users));

    /**
     * Toggles tuit like by user by adding/removing like instance and updating
     * respective stats values for the tuit instance
     * @param {Request} req Represents request from client, including path
     * parameter uid and tid, identifying the user and the tuit
     * @param {Response} res Represents response to client, including the
     * status code whether the operation was performed successfully or not
     */
     userTogglesTuitLikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
                profile._id : uid;
        try {
            const userAlreadyLikedTuit = await LikeController.likeDao
                .findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await LikeController.likeDao
                .countHowManyLikedTuit(tid);
            let tuit = await LikeController.tuitDao.findTuitById(tid);
            if (userAlreadyLikedTuit) {
            await LikeController.likeDao.removeLikeToTuit(userId, tid);
            tuit.stats.likes = howManyLikedTuit - 1;
            } else {
            await LikeController.likeDao.addLikeToTuit(userId, tid);
            tuit.stats.likes = howManyLikedTuit + 1;
            };
            await LikeController.tuitDao.updateStats(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }

    }
         

}
