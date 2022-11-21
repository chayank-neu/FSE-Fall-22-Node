/**
 * @file Represents the tuit DAO methods
 */
import Tuit from "../../models/tuits/Tuit";
import User from "../../models/users/User";

export default interface TuitDao {
   findAllTuits(): Promise<Tuit[]>;
   findTuitsByUser(uid: string): Promise<Tuit[]>;
   findTuitById(tid: string): Promise<Tuit>;
   createTuit(tuit: Tuit): Promise<Tuit>;
   updateTuit(tid: string, tuit: Tuit): Promise<any>;
   deleteTuit(tid: string): Promise<any>;
   createTuitByUser (uid: string, tuit: Tuit): Promise<Tuit>;
}
