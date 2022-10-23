import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/tuits/TuitModel";
import FollowDaoI from "../interfaces/FollowDao";
import UserModel from "../mongoose/users/UserModel";
import User from "../models/User";
import { json } from "body-parser";
import Like from "../models/Like";
import LikeModel from "../mongoose/likes/LikeModel";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/follows/FollowModel";

export default class FollowDao implements FollowDaoI {
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

    async userUnfollowsAnotherUser(uid: string, uid2: string): Promise<any> {
        const exist_follow : any = await FollowModel
        .findOne({userFollowed : uid2, userFollowing : uid})

        if (exist_follow != null) {
            return await FollowModel.deleteOne({_id: exist_follow.id});
        }
        return false;
    }

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