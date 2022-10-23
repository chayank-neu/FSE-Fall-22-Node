/**
 * @file shows the model of the Bookmark
 */

/**
 * @class Bookmark Represents bookmark relation between user n tuit
 * @property {Tuit} bookmarkedTuit tuit bookmarked
 * @property {User} bookmarkedBy bookmarked by user
 */
export default class Bookmark {

    private bookmarkedTuit: string;
    private bookmarkedBy: string;

    constructor(bookmarkedTuit?: string, bookmarkedBy?: string) {
           this.bookmarkedTuit = bookmarkedTuit||'';
           this.bookmarkedBy = bookmarkedBy||"";
        }
}