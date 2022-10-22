import Like from "../models/Like";
import Tuit from "../models/Tuit";
import User from "../models/User";

export default interface LikeDao {
   addLikeToTuit(uid: string, tid: string): Promise<Like>;
   removeLikeToTuit(uid: string, tid: string): Promise<any>;
   findAllTuitsLikedByUser(uid: string): Promise<Tuit[]>;
   findAllUsersByTuitLike(tid: string): Promise<User[]>;
}
