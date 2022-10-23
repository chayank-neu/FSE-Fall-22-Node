/**
 * @file Implements management and  data storage of follows.
 */

import FollowDaoI from "../../interfaces/follows/FollowDao";
import UserModel from "../../mongoose/users/UserModel";
import User from "../../models/users/User";
import { json } from "body-parser";
import Like from "../../models/likes/Like";
import LikeModel from "../../mongoose/likes/LikeModel";
import Follow from "../../models/follows/Follow";
import FollowModel from "../../mongoose/follows/FollowModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage of follows
 * @implements {FollowDaoI} FollowDaoI
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null){
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {
    }

    /**
     * Inserts a follow instance into follows collection in the database
     * @param {string} uid primary key of user who is following the user uid2
     * @param {string} uid2 primary key of the user who is being followed by uid1
     * @returns {Promise} To be notified when the follow instance is created in the database
     */
    async userFollowsAnotherUser(uid: string, uid2: string): Promise<Follow> {

        const exist_follow : Follow = await FollowModel
        .findOne({userFollowed : uid2, userFollowing : uid})

        if (exist_follow == null) {
            const new_follow = new Follow(uid2, uid);
            const new_follow_in_db : any = await FollowModel.create(new_follow)

            return new_follow_in_db;
        }
        return exist_follow;
    }

    /**
     * Deletes a follow instance from follows collection in the database
     * @param {string} uid primary key of user who is following the user uid2
     * @param {string} uid2 primary key of the user who is being followed by uid1
     * @returns {Promise} To be notified when the follow instance is removed from the database
     */
    async userUnfollowsAnotherUser(uid: string, uid2: string): Promise<any> {
        const exist_follow : any = await FollowModel
        .findOne({userFollowed : uid2, userFollowing : uid})

        if (exist_follow != null) {
            return await FollowModel.deleteOne({_id: exist_follow.id});
        }
        return false;
    }

    /**
     * Retrieves all the users that are followed by a  user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the users are retrieved from database
     */
    async findAllUsersFollowedByUser(uid: string): Promise<User[]> {
        const follows : any =  await FollowModel
        .find({userFollowing : uid})

        const followedUsers: User[] | PromiseLike<User[]> = [];

        if (follows != null) {

            for(let i=0; i<follows.length; i++){
                console.log(follows[i].userFollowed); //use i instead of 0
                const user : any = await UserModel.findById(follows[i].userFollowed)
                followedUsers.push(user)
            }
        }
        return followedUsers
    }

    /**
     * Retrieves all the followers of a  user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the users are retrieved from database
     */
    async findAllFollowersOfUser(uid: string): Promise<User[]> {
        const follows : any =  await FollowModel
        .find({userFollowed : uid})

        const followingUsers: User[] | PromiseLike<User[]> = [];

        if (follows != null) {

            for(let i=0; i<follows.length; i++){
                console.log(follows[i].userFollowing); //use i instead of 0
                const user : any = await UserModel.findById(follows[i].userFollowing)
                followingUsers.push(user)
            }
        }
        return followingUsers
    }
   
   
}