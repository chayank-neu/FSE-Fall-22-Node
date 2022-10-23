/**
 * @file Controller for handling bookmarks
 */
import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import BookmarkDao from "../../daos/bookmarks/BookmarkDao";
import BookmarkControllerI from "../../interfaces/bookmarks/BookmarkController";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @class This class implements the RESTful web service api for handling bookmarks related operations.
 * @property {BookmarkDao} bookmarkDao implementing the CRUD operations
 * @property {BookmarkController} bookmarkController implementing the CRUD APIs
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao:BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController:BookmarkController | null = null;

    /**
     * Creates a singleton controller instance
     * @param {Express} app An express instance to declare the Web service api
     * @returns bookmarkController
     */
    public static getInstance = (app:Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null){
            BookmarkController.bookmarkController = new BookmarkController();
            app.get("/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.post("/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnBookmarksTuit);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {
    }

    /**
     * Inserts a bookmark instance into bookmarks collection in the database
     * @param {Request} req is the request from client, with uid as the primary key of the user who
     * bookmarks a tuit and tid being the primary key of the tuit that is bookmarked
     * @param {Response} res Represents response to client as JSON that contains the bookmark instance that is added in
     * the database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
        .then(bookmark => res.json(bookmark));


    /**
     * Deletes a bookmark instance from bookmarks collection in the database
     * @param {Request} req is the request from client, with uid as the primary key of the user who
     * bookmarks a tuit and tid being the primary key of the tuit that is bookmarked
     * @param {Response} res is the response to the client that contains the delete status
     */
    userUnBookmarksTuit = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao.userUnBookmarksTuit(req.params.uid, req.params.tid)
        .then(status => res.json(status));

    /**
     * Retrieves all the tuits bookmarked by a particular user
     * @param {Request} req is the request from clients
     * @param {Response} res is the response to the client as JSON containing all tuits that are bookmarked
     */   
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
        .then(tuits => res.json(tuits));

}
