/**
 * @file Implements management and  data storage of bookmarks.
 */
import { json } from "body-parser";
import BookmarkDaoI from "../../interfaces/bookmarks/BookmarkDao";
import Bookmark from "../../models/bookmarks/Bookmark";
import Tuit from "../../models/tuits/Tuit";
import BookmarkModel from "../../mongoose/bookmarks/BookmarkModel";
import TuitModel from "../../mongoose/tuits/TuitModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage of bookmarks
 * @implements {BookmarkDaoI} BookmarkDaoI
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {

    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null){
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    }

    /**
     * Inserts a bookmark instance into bookmarks collection in the database
     * @param {string} uid primary key of user who bookmarked a tuit
     * @param {string} tid primary key of the tuit that is bookmarked by the user
     * @returns {Promise} To be notified when the bookmark instance is created in the database
     */
    async userBookmarksTuit(uid: string, tid: string): Promise<Bookmark> {

        const exist_bookmark : Bookmark = await BookmarkModel
        .findOne({bookmarkedTuit : tid, bookmarkedBy : uid})

        if (exist_bookmark == null) {
            const new_bookmark = new Bookmark(tid, uid);
            const new_bookmark_in_db : any = await BookmarkModel.create(new_bookmark)

            return new_bookmark_in_db;
        }
        return exist_bookmark;
    }

    /**
     * Deletes a bookmark instance from bookmarks collection in the database
     * @param {string} uid primary key of user who wants to unbookmark a tuit
     * @param {string} tid primary key of the tuit that is unbookmarked by the user
     * @returns {Promise} To be notified when the bookmark instance is removed from the database
     */
    async userUnBookmarksTuit(uid: string, tid: string): Promise<any> {
        const exist_bookmark : any = await BookmarkModel
        .findOne({bookmarkedTuit : tid, bookmarkedBy : uid})

        if (exist_bookmark != null) {
            return await BookmarkModel.deleteOne({_id: exist_bookmark.id});
        }
        return false;
    }

    /**
     * Retrieves all the tuits bookmarked by a  user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the bookmarked tuits are retrieved from database
     */
    async findAllTuitsBookmarkedByUser(uid: string): Promise<Tuit[]> {
        const bookmarks : any =  await BookmarkModel
        .find({bookmarkedBy : uid})

        const bookmarkedTuits: Tuit[] | PromiseLike<Tuit[]> = [];

        if (bookmarks != null) {

            for(let i=0; i<bookmarks.length; i++){
                console.log(bookmarks[i].bookmarkedTuit); //use i instead of 0
                const tuit : any = await TuitModel.findById(bookmarks[i].bookmarkedTuit)
                bookmarkedTuits.push(tuit)
            }
        }
        return bookmarkedTuits
    }
   
   
}