import Follow from "../models/follows/Follow";
import Like from "../models/likes/Like";
import Tuit from "../models/tuits/Tuit";
import User from "../models/users/User";

export default interface FollowDao {
   userFollowsAnotherUser(uid: string, uid2: string): Promise<Follow>;
   userUnfollowsAnotherUser(uid: string, uid2: string): Promise<any>;
   findAllUsersFollowedByUser(uid: string): Promise<User[]>;
   findAllFollowersOfUser(uid: string): Promise<User[]>;
}
