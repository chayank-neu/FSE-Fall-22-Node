/**
 * @file Controller for handling follows
 */

import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import FollowDao from "../../daos/follows/FollowDao";
import LikeDao from "../../daos/likes/LikeDao";
import FollowControllerI from "../../interfaces/follows/FollowController";

/**
 * @class This class implements the RESTful web service api for handling follows related operations.
 * @property {FollowDao} followDao implementing the CRUD operations
 * @property {FollowController} followController implementing the CRUD APIs
 */
export default class FollowController implements FollowControllerI {

    private static followDao:FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates a singleton controller instance
     * @param {Express} app An express instance to declare the Web service api
     * @returns followController
     */
    public static getInstance = (app:Express): FollowController => {
        if(FollowController.followController === null){
            FollowController.followController = new FollowController();
            app.post('/users/:uid/follows/:uid2', FollowController.followController.userFollowsAnotherUser);
            app.delete('/users/:uid/follows/:uid2', FollowController.followController.userUnfollowsAnotherUser);
            app.get('/users/:uid/followers', FollowController.followController.findAllUsersFollowersByUser);
            app.get('/users/:uid/following', FollowController.followController.findAllFollowersOfUser);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    /**
     * Inserts a follow instance into follows collection in the database
     * @param {Request} req is the request from clients with
     * uid1 as primary key of user who is following the user uid2
     * @param {Response} res is the response to the client as JSON that contains
     * the follow instance that was added in the database
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.uid2)
        .then(follow => res.json(follow));

    /**
     * Deletes a follow instance from the follows collection in the database
     * @param {Request} req is the request from clients with
     * uid1 as primary key of user who is following the user uid2
     * @param {Response} res is the response to the client that contains the delete status
     */
    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.uid2)
        .then(status => res.json(status));

    /**
     * Retrieves all the users that are followed by a particular user
     * @param {Request} req is the request from clients with uid as the primary
     * key of the user who follows other users
     * @param {Response} res is the response to the client as JSON that contains users list
     */
    findAllUsersFollowersByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
        .then(users => res.json(users));

    /**
     * Retrieves all the followers of a particular user
     * @param {Request} req is the request from clients with uid as the primary
     * key of the user being followed
     * @param {Response} res is the response to the client as JSON that contains users list
     */
    findAllFollowersOfUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowersOfUser(req.params.uid)
        .then(users => res.json(users));

}
