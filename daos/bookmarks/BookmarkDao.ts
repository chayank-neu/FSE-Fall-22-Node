import { json } from "body-parser";
import BookmarkDaoI from "../../interfaces/bookmarks/BookmarkDao";
import Bookmark from "../../models/bookmarks/Bookmark";
import Tuit from "../../models/Tuit";
import BookmarkModel from "../../mongoose/bookmarks/BookmarkModel";
import TuitModel from "../../mongoose/tuits/TuitModel";

export default class BookmarkDao implements BookmarkDaoI {

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

    async userUnBookmarksTuit(uid: string, tid: string): Promise<any> {
        const exist_bookmark : any = await BookmarkModel
        .findOne({bookmarkedTuit : tid, bookmarkedBy : uid})

        if (exist_bookmark != null) {
            return await BookmarkModel.deleteOne({_id: exist_bookmark.id});
        }
        return false;
    }

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