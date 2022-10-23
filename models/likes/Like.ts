/**
 * @file shows the model of the like
 */

/**
 * @class Like Represents the like relation between user and tuit
 * @property {Tuit} tuit the tuit thats liked
 * @property {User} likedBy user who liked the tuit
 */
export default class Like {

    private tuit: string = '';
    private likedBy: string;

    constructor(tuit?: string, likedBy?: string) {
           this.tuit = tuit||'';
           this.likedBy = likedBy||"";
        }
}