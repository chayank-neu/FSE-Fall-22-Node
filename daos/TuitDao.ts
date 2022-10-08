import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";
import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import { json } from "body-parser";

export default class TuitDao implements TuitDaoI {
   async findAllTuits(): Promise<Tuit[]> {
       return await TuitModel.find();
   }

   async findTuitById(tid: string): Promise<any> {
       return await TuitModel.findById(tid);
   }

   async findTuitsByUser(uid: string): Promise<Tuit[]> {
    const tuits =  await TuitModel.find({postedBy: uid});
    const user_raw_info = await UserModel.findById(uid);
    const tuitsWithUsrInfo: Tuit[] | PromiseLike<Tuit[]> = [];

    if (user_raw_info != null) {
        const user_info = new User(user_raw_info.username, 
            user_raw_info.password, user_raw_info.firstName || '', 
            user_raw_info.lastName||'', user_raw_info.email||'');

        tuits.forEach( (tuit) => {
                tuitsWithUsrInfo.push(new Tuit(
                    tuit.tuit||'', tuit.postedOn, tuit.postedBy
                ))
            });
    }
    return tuitsWithUsrInfo;
    }

   async createTuit(tuit: Tuit): Promise<User> {
    const new_tuit =  await TuitModel.create(tuit);
    const user_raw_info = await UserModel.findById(new_tuit.postedBy);
    if (user_raw_info != null) {
    const user_info = new User(user_raw_info.username, 
        user_raw_info.password, user_raw_info.firstName || '', 
        user_raw_info.lastName||'', user_raw_info.email||'');
    return user_info;
    }
       return new User();
   }

   async deleteTuit(tid: string):  Promise<any> {
       return await TuitModel.deleteOne({_id: tid});
   }

   async updateTuit(tid: string, tuit: any): Promise<any> {
       return await TuitModel.updateOne({_id: tid}, {$set: tuit});
   }
}