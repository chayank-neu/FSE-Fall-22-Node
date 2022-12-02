/**
 * @file Controller for handling likes
 */

import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import DislikeDao from "../../daos/dislikes/DislikeDao";
import TuitDao from "../../daos/tuits/TuitDao";
import DislikeControllerI from "../../interfaces/dislikes/DislikeController";
import LikeDao from "../../daos/likes/LikeDao";
import TuitController from "../tuits/TuitController";

/**
 * @class This class implements the RESTful web service api for handling likes related operations.
 * @property {DislikeDao} dislikeDao implementing the CRUD operations
 * @property {DislikeController} dislikeController implementing the CRUD APIs
 */
export default class DislikeController implements DislikeControllerI {
    private static dislikeDao:DislikeDao = DislikeDao.getInstance();
    private static likeDao:LikeDao = LikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeController: DislikeController | null = null;

    /**
     * Creates a singleton controller instance
     * @param {Express} app An express instance to declare the Web service api
     * @returns dislikeController
     */
    public static getInstance = (app: Express): DislikeController => {
        if(DislikeController.dislikeController === null){
            DislikeController.dislikeController = new DislikeController();

            app.post('/users/:uid/dislikes/:tid', DislikeController.dislikeController.addDislikeToTuit);
            app.delete('/users/:uid/dislikes/:tid', DislikeController.dislikeController.removeDislikeToTuit);
            app.get('/users/:uid/dislikes', DislikeController.dislikeController.findAllTuitsDislikedByUser);
            app.get('/tuits/:tid/dislikes', DislikeController.dislikeController.findAllUsersByTuitDislike);
            app.put('/users/:uid/dislikes/:tid', DislikeController.dislikeController.userTogglesTuitDislikes);

        }
        return DislikeController.dislikeController;
    }
    private constructor() {
    }

    /**
     * Inserts a new dislike instance into the dislikes collection in the database
     * @param {Request} req is the request from clients with tid as the tuit's primary key
     * and uid as the user's primary key
     * @param {Response} res is the response to the client as JSON which contains the dislike
     * that was inserted in the databases
     */
    addDislikeToTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.addDislikeToTuit(req.params.uid, req.params.tid)
        .then(dislike => res.json(dislike));

    /**
     * Deletes a dislike instance from the dislikes collection in the database
     * @param {Request} req is the request from clients with tid as the tuit's primary key
     * and uid as the user's primary key
     * @param {Response} res is the response to the client with delete status
     */
    removeDislikeToTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.removeDislikeToTuit(req.params.uid, req.params.tid)
        .then(status => res.json(status));

    /**
     * Retrieves all the tuits disliked by a particular user
     * @param {Request} req is the request from clients with uid as the users primary key
     * @param {Response} res is the response to the client as JSON that contains tuits list
     */
    findAllTuitsDislikedByUser = (req: Request, res: Response) =>
        DislikeController.dislikeDao.findAllTuitsDislikedByUser(req.params.uid)
        .then(tuits => res.json(tuits));
    
    /**
     * Retrieves all the users that disliked by a particular tuit
     * @param {Request} req is the request from clients with tid as the tuit's primary key
     * @param {Response} res is the response to the client as JSON which contains users list
     */
    findAllUsersByTuitDislike = (req: Request, res: Response) =>
        DislikeController.dislikeDao.findAllUsersByTuitDislike(req.params.tid)
        .then(users => res.json(users));

    /**
     * Toggles tuit dislike by user by adding/removing dislike instance and updating
     * respective stats values for the tuit instance
     * @param {Request} req Represents request from client, including path
     * parameter uid and tid, identifying the user and the tuit
     * @param {Response} res Represents response to client, including the
     * status code whether the operation was performed successfully or not
     */
     userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
                profile._id : uid;

        console.log('came here')
        try {
            const userAlreadyDislikedTuit = await DislikeController.dislikeDao
                .findUserDislikesTuit(userId, tid);
            const howManyDislikedTuit = await DislikeController.dislikeDao
                .countHowManyDislikedTuit(tid);
            let tuit = await DislikeController.tuitDao.findTuitById(tid);
            if (userAlreadyDislikedTuit) {
                await DislikeController.dislikeDao.removeDislikeToTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit - 1;
            } else {
                await DislikeController.dislikeDao.addDislikeToTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit + 1;

                // the update to like if present
                const userLikedTuit = await DislikeController.likeDao
                .findUserLikesTuit(userId, tid);
                if (userLikedTuit) {
                    const howManyLikedTuit = await DislikeController.likeDao
                        .countHowManyLikedTuit(tid);
                    await DislikeController.likeDao.removeLikeToTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit - 1;
                }
            };
            await DislikeController.tuitDao.updateStats(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }

    }
         

}
