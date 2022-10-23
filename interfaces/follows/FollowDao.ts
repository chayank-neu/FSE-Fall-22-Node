/**
 * @file Represents the follow DAO methods
 */
import Follow from "../../models/follows/Follow";
import User from "../../models/users/User";

export default interface FollowDao {
   userFollowsAnotherUser(uid: string, uid2: string): Promise<Follow>;
   userUnfollowsAnotherUser(uid: string, uid2: string): Promise<any>;
   findAllUsersFollowedByUser(uid: string): Promise<User[]>;
   findAllFollowersOfUser(uid: string): Promise<User[]>;
}
