import Bookmark from "../../models/bookmarks/Bookmark";
import Tuit from "../../models/tuits/Tuit";

export default interface BookmarkDao {
   userBookmarksTuit(uid: string, tuit: string): Promise<Bookmark>;
   userUnBookmarksTuit(uid: string, tuit: string): Promise<any>;
   findAllTuitsBookmarkedByUser(uid: string): Promise<Tuit[]>;
}
