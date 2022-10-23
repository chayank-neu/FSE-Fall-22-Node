/**
 * @file Implements management and  data storage of tuits.
 */
import Tuit from "../../models/tuits/Tuit";
import TuitModel from "../../mongoose/tuits/TuitModel";
import TuitDaoI from "../../interfaces/tuits/TuitDao";
import UserModel from "../../mongoose/users/UserModel";
import User from "../../models/users/User";
import { json } from "body-parser";

/**
 * @class TuitDoa Implements Data Access Object managing data storage of tuits
 * @implements {TuitDaoI} TuitDaoI
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {

    private static tuitDao: TuitDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Retrieves all the tuits from tuits collection
     * @returns {Promise} To be notified when the tuits are retrieved from database
     */
   async findAllTuits(): Promise<Tuit[]> {
       return await TuitModel.find();
   }

   /**
     * Retrieves a single tuit from tuits collection
     * @param {string} tid tuit's primary key
     * @returns {Promise} To be notified when tuit is retrieved from the database
     */
   async findTuitById(tid: string): Promise<any> {
       return await TuitModel.findById(tid);
   }

   /**
     * Retrieve all the tuit documents by one user
     * @param {string} uid user's primary key
     * @returns {Promise} To be notified when tuits are retrieved from the database
     */
   async findTuitsByUser(uid: string): Promise<Tuit[]> {
    const tuits : any =  await TuitModel.find({postedBy: uid});
    const user_raw_info = await UserModel.findById(uid);
    const tuitsWithUsrInfo: Tuit[] | PromiseLike<Tuit[]> = [];

    if (user_raw_info != null) {
        const user_info = new User(user_raw_info.username, 
            user_raw_info.password, user_raw_info.firstName || '', 
            user_raw_info.lastName||'', user_raw_info.email||'');

        tuits.forEach( (tuit: { tuit: any; postedOn: Date | undefined; postedBy: string | undefined; }) => {
                tuitsWithUsrInfo.push(new Tuit(
                    tuit.tuit||'', tuit.postedOn, tuit.postedBy
                ))
            });
    }
    return tuitsWithUsrInfo;
    }

    /**
     * Inserts a new tuit into the database
     * @param {Tuit} tuit the tuit to be inserted
     * @returns {Promise} To be notified when tuit is inserted into the database
     */
   async createTuit(tuit: Tuit): Promise<User> {
    const new_tuit : any =  await TuitModel.create(tuit);
    const user_raw_info = await UserModel.findById(new_tuit.postedBy);
    if (user_raw_info != null) {
    const user_info = new User(user_raw_info.username, 
        user_raw_info.password, user_raw_info.firstName || '', 
        user_raw_info.lastName||'', user_raw_info.email||'');
    return user_info;
    }
       return new User();
   }

   /**
     * Deletes a tuit from the database
     * @param {string} tid Primary key of the tuit
     * @returns {Promise} To be notified when tuit is deleted from the database
     */
   async deleteTuit(tid: string):  Promise<any> {
       return await TuitModel.deleteOne({_id: tid});
   }

   /**
     * Updates a particular tuit in database with new values provided
     * @param {string} tid Primary key of tuit
     * @param {Tuit} tuit Tuit object with new values
     * @returns {Promise} To be notified when tuit is updated in the database
     */
   async updateTuit(tid: string, tuit: any): Promise<any> {
       return await TuitModel.updateOne({_id: tid}, {$set: tuit});
   }
}