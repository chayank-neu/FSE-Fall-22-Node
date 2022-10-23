/**
 * @file shows the model of the follow
 */

/**
 * @class Follow Represents follow relationship between users
 * @property {User} userFollowed this user followed
 * @property {User} userFollowing the user following
 */
export default class Follow {

    private userFollowed: string;
    private userFollowing: string;

    constructor(userFollowed?: string, userFollowing?: string) {
           this.userFollowed = userFollowed||'';
           this.userFollowing = userFollowing||"";
        }
}