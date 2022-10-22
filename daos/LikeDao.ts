import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import LikeDaoI from "../interfaces/LikeDao";
import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import { json } from "body-parser";
import Like from "../models/Like";
import LikeModel from "../mongoose/LikeModel";
export default class LikeDao implements LikeDaoI {
    async addLikeToTuit(uid: string, tid: string): Promise<Like> {
        const exist_like : any = await LikeModel.findOne({tuit : tid, likedBy : uid})
        if (exist_like == null) {
            const new_like = new Like(tid, uid);
            const new_like_in_db : any = await LikeModel.create(new_like)

            return new_like_in_db;
        }
        return exist_like;
    }

    async removeLikeToTuit(uid: string, tid: string): Promise<any> {
        const exist_like : any = await LikeModel.findOne({tuit : tid, likedBy : uid})
        if (exist_like != null) {
            return await LikeModel.deleteOne({_id: exist_like._id});
        }
        return false;
    }

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
   
}