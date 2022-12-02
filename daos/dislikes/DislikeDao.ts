/**
 * @file Implements management and  data storage of likes.
 */

import Tuit from "../../models/tuits/Tuit";
import TuitModel from "../../mongoose/tuits/TuitModel";
import DislikeDaoI from "../../interfaces/dislikes/DislikeDao";
import UserModel from "../../mongoose/users/UserModel";
import User from "../../models/users/User";
import { json } from "body-parser";
import DisLike from "../../models/dislikes/Dislike";
import DislikeModel from "../../mongoose/dislikes/DislikeModel";
import Dislike from "../../models/dislikes/Dislike";

/**
 * @class LikeDao Implements Data Access Object managing data storage of dislikes
 * @implements {DislikeDaoI} DislikeDaoI
 * @property {DislikeDao} dislikeDao Private single instance of DisLikeDao
 */
export default class DislikeDao implements DislikeDaoI {

    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null){
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {
    }

    /**
     * Inserts a new Dislike instance into the dislikes collection in the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the Dislike instance is inserted into the database
     */
    async addDislikeToTuit(uid: string, tid: string): Promise<Dislike> {
        const exist_dislike : any = await DislikeModel.findOne({tuit : tid, likedBy : uid})
        if (exist_dislike == null) {
            const new_dislike = new Dislike(tid, uid);
            const new_dislike_in_db : any = await DislikeModel.create(new_dislike)

            return new_dislike_in_db;
        }
        return exist_dislike;
    }

    /**
     * Deletes a Dislike instance from the dislikes collection in the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the Dislike instance is deleted from the database
     */
    async removeDislikeToTuit(uid: string, tid: string): Promise<any> {
        const exist_dislike : any = await DislikeModel.findOne({tuit : tid, dislikedBy : uid})
        if (exist_dislike != null) {
            return await DislikeModel.deleteOne({_id: exist_dislike._id});
        }
        return false;
    }

    /**
     * Retrieves all the tuits disliked by a particular user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the tuits are retrieved from database
     */
    async findAllTuitsDislikedByUser(uid: string): Promise<Tuit[]> {

        return DislikeModel
            .find(({dislikedBy: uid}))
            .exec();
    }

    /**
     * Retrieves all the users that disliked by a particular tuit
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the users are retrieved from database
     */
    async findAllUsersByTuitDislike(tid: string): Promise<User[]> {
        const dislikes : any =  await DislikeModel.find({tuit: tid});
        const users: User[] | PromiseLike<User[]> = [];

        if (dislikes != null) {

            for(let i=0; i<dislikes.length; i++){
                console.log(dislikes[i].dislikedBy); //use i instead of 0
                const user : User = await UserModel.findById(dislikes[i].dislikedBy)
                users.push(user)
            }

        }

        return users
    }

    /**
     * retrieves count of dislikes for tuit
     * @param {string} tid tuit's id
     * @returns Promise To be notified when count is retrieved from the database
     */
     async countHowManyDislikedTuit(tid: string): Promise<any> {
        return DislikeModel.count({tuit: tid});
    }

    /**
     * Uses DislikeModel to retrieve if user Disliked a specified tuit
     * @param {string} uid user's id
     * @param {string} tid tuit's id
     * @returns Promise To be notified when Dislike is retrieved from the database
     */
     async findUserDislikesTuit(uid: string, tid: string): Promise<Dislike> {
        return DislikeModel.findOne({
            tuit: tid,
            dislikedBy: uid
        });
    }    
   
}