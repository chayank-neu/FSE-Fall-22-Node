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
    // console.log(TuitModel
    //   .find({postedBy: uid})
    //   .populate('postedBy', 'username')
    //   .exec())
    const x =  await TuitModel
        .find({postedBy: uid})
        .populate('postedBy', 'username')
        .exec();

        console.log(x)
        return x;
  }

    /**
     * Inserts a new tuit into the database
     * @param {Tuit} tuit the tuit to be inserted
     * @returns {Promise} To be notified when tuit is inserted into the database
     */
   async createTuit(tuit: Tuit): Promise<Tuit> {
    const new_tuit : any =  await TuitModel.create(tuit);
    return new_tuit;
   }

   /**
     * Inserts new tuit instance into the database
     * @param {string} uid PK of the user
     * @param {Tuit} tuit the tuit to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> => {
      const new_tuit : any =  await TuitModel.create({...tuit, postedBy: uid});
      return new_tuit;
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

    /**
     * Updates a tuit's stat
     * @param {string} tid tuit's id
     * @param {any} newStats new stats that is updted for tuit
     * @returns Promise To be notified when tuit is updated in the database
     */
     async updateStats(tid: string, newStats: any): Promise<any> {
      return TuitModel.updateOne({_id: tid},
          {$set: {stats: newStats}});
    }
        
}