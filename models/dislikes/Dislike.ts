/**
 * @file shows the model of the dislike
 */

/**
 * @class Represents the dislike relation between user and tuit
 * @property {Tuit} tuit the tuit disliked
 * @property {User} dislikedBy user disliked the tuit
 */
 export default class Dislike {

    private tuit: string = '';
    private dislikedBy: string;

    constructor(tuit?: string, dislikedBy?: string) {
           this.tuit = tuit||'';
           this.dislikedBy = dislikedBy||"";
        }
}