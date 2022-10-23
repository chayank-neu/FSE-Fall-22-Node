export default class Follow {

    private userFollowed: string;
    private userFollowing: string;

    constructor(userFollowed?: string, userFollowing?: string) {
           this.userFollowed = userFollowed||'';
           this.userFollowing = userFollowing||"";
        }
}