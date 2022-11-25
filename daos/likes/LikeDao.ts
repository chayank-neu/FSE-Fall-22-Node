/**
 * @file Implements management and  data storage of likes.
 */

import Tuit from "../../models/tuits/Tuit";
import TuitModel from "../../mongoose/tuits/TuitModel";
import LikeDaoI from "../../interfaces/likes/LikeDao";
import UserModel from "../../mongoose/users/UserModel";
import User from "../../models/users/User";
import { json } from "body-parser";
import Like from "../../models/likes/Like";
import LikeModel from "../../mongoose/likes/LikeModel";

/**
 * @class LikeDao Implements Data Access Object managing data storage of likes
 * @implements {LikeDaoI} LikeDaoI
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {

    private static likeDao: LikeDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null){
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {
    }

    /**
     * Inserts a new like instance into the likes collection in the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the like instance is inserted into the database
     */
    async addLikeToTuit(uid: string, tid: string): Promise<Like> {
        const exist_like : any = await LikeModel.findOne({tuit : tid, likedBy : uid})
        if (exist_like == null) {
            const new_like = new Like(tid, uid);
            const new_like_in_db : any = await LikeModel.create(new_like)

            return new_like_in_db;
        }
        return exist_like;
    }

    /**
     * Deletes a like instance from the likes collection in the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the like instance is deleted from the database
     */
    async removeLikeToTuit(uid: string, tid: string): Promise<any> {
        const exist_like : any = await LikeModel.findOne({tuit : tid, likedBy : uid})
        if (exist_like != null) {
            return await LikeModel.deleteOne({_id: exist_like._id});
        }
        return false;
    }

    /**
     * Retrieves all the tuits liked by a particular user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the tuits are retrieved from database
     */
    async findAllTuitsLikedByUser(uid: string): Promise<Tuit[]> {
        const likes : any =  await LikeModel.find({likedBy: uid});

        const tuits: Tuit[] | PromiseLike<Tuit[]> = [];

        if (likes != null) {

            for(let i=0; i<likes.length; i++){
                console.log(likes[i].tuit); //use i instead of 0
                const tuit : any = await TuitModel.findById(likes[i].tuit)
                tuits.push(new Tuit(
                            tuit._id, tuit.postedOn, tuit.postedBy
                        ))
            }
        }
        return tuits
    }

    /**
     * Retrieves all the users that liked by a particular tuit
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the users are retrieved from database
     */
    async findAllUsersByTuitLike(tid: string): Promise<User[]> {
        const likes : any =  await LikeModel.find({tuit: tid});
        const users: User[] | PromiseLike<User[]> = [];

        if (likes != null) {

            for(let i=0; i<likes.length; i++){
                console.log(likes[i].likedBy); //use i instead of 0
                const user : User = await UserModel.findById(likes[i].likedBy)
                users.push(user)
            }

        }

        return users
    }

    /**
     * retrieves count of likes for tuit
     * @param {string} tid tuit's id
     * @returns Promise To be notified when count is retrieved from the database
     */
     async countHowManyLikedTuit(tid: string): Promise<any> {
        return LikeModel.count({tuit: tid});
    }

    /**
     * Uses LikeModel to retrieve if user liked a specified tuit
     * @param {string} uid user's id
     * @param {string} tid tuit's id
     * @returns Promise To be notified when like is retrieved from the database
     */
     async findUserLikesTuit(uid: string, tid: string): Promise<Like> {
        return LikeModel.findOne({
            tuit: tid,
            likedBy: uid
        });
    }    
   
}