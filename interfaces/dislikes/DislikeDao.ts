/**
 * @file Represents the like DAO methods
 */
import Dislike from "../../models/dislikes/Dislike";
import Tuit from "../../models/tuits/Tuit";
import User from "../../models/users/User";

export default interface DislikeDao {
   addDislikeToTuit(uid: string, tid: string): Promise<Dislike>;
   removeDislikeToTuit(uid: string, tid: string): Promise<any>;
   findAllTuitsDislikedByUser(uid: string): Promise<Tuit[]>;
   findAllUsersByTuitDislike(tid: string): Promise<User[]>;
   countHowManyDislikedTuit(tid: string): Promise<any>;
   findUserDislikesTuit(uid: string, tid: string): Promise<Dislike>;
}
