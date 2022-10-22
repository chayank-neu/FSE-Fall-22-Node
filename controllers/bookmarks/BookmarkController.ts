import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import BookmarkDao from "../../daos/bookmarks/BookmarkDao";
import BookmarkControllerI from "../../interfaces/bookmarks/BookmarkController";
import Bookmark from "../../models/bookmarks/Bookmark";

export default class BookmarkController implements BookmarkControllerI {
   app: Express;
   bookmarkDao: BookmarkDao;

   constructor(app: Express, bookmarkDao: BookmarkDao) {
       this.app = app;
       this.bookmarkDao = bookmarkDao;
       
       this.app.post('/users/:uid/bookmarks/:tid', this.userBookmarksTuit);
       this.app.delete('/users/:uid/bookmarks/:tid', this.userUnBookmarksTuit);
       this.app.get('/users/:uid/bookmarks', this.findAllTuitsBookmarkedByUser);
   }

    userBookmarksTuit = (req: Request, res: Response) =>
        this.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
        .then(bookmark => res.json(bookmark));

    userUnBookmarksTuit = (req: Request, res: Response) =>
        this.bookmarkDao.userUnBookmarksTuit(req.params.uid, req.params.tid)
        .then(status => res.json(status));

    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        this.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
        .then(tuits => res.json(tuits));

}
