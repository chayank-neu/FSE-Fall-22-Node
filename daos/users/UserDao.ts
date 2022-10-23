import User from "../../models/users/User";
import UserModel from "../../mongoose/users/UserModel";
import UserDaoI from "../../interfaces/users/UserDao";

export default class UserDao implements UserDaoI {
   async findAllUsers(): Promise<User[]> {
       return await UserModel.find();
   }
   async findUserById(uid: string): Promise<any> {
       return await UserModel.findById(uid);
   }
   async createUser(user: User): Promise<User> {
    const a : any = await UserModel.create(user);
    return new User(a.username, a.password, a.firstName || '', a.lastName||'', a.email||'');
   }
   async deleteUser(uid: string):  Promise<any> {
       return await UserModel.deleteOne({_id: uid});
   }
   async updateUser(uid: string, user: any): Promise<any> {
    //    return await UserModel.updateOne({_id: uid}, {$set: user});
    const result = await UserModel.updateOne(
        {_id: uid},
        {$set: user}
        );
    return result.upsertedCount;
   }
}
