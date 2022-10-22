import Follow from "../models/Follow";
import Like from "../models/Like";
import Tuit from "../models/Tuit";
import User from "../models/User";

export default interface FollowDao {
   userFollowsAnotherUser(uid: string, uid2: string): Promise<Follow>;
   userUnfollowsAnotherUser(uid: string, uid2: string): Promise<any>;
   findAllUsersFollowedByUser(uid: string): Promise<User[]>;
   findAllFollowersOfUser(uid: string): Promise<User[]>;
}
