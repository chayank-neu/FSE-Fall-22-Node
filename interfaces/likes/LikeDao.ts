/**
 * @file Represents the like DAO methods
 */
import Like from "../../models/likes/Like";
import Tuit from "../../models/tuits/Tuit";
import User from "../../models/users/User";

export default interface LikeDao {
   addLikeToTuit(uid: string, tid: string): Promise<Like>;
   removeLikeToTuit(uid: string, tid: string): Promise<any>;
   findAllTuitsLikedByUser(uid: string): Promise<Tuit[]>;
   findAllUsersByTuitLike(tid: string): Promise<User[]>;
}
