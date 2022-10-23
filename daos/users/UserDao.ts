/**
 * @file Implements management and  data storage of users.
 */
import User from "../../models/users/User";
import UserModel from "../../mongoose/users/UserModel";
import UserDaoI from "../../interfaces/users/UserDao";

/**
 * @class UserDao Implements Data Access Object managing data storage of users
 * @implements {UserDaoI} UserDaoI
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns UserDao
     */
    public static getInstance = (): UserDao => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    private constructor() {
    }

    /**
     * Retrieves all the users from users collection
     * @returns {Promise} To be notified when the users are retrieved from database
     */
   async findAllUsers(): Promise<User[]> {
       return await UserModel.find();
   }

    /**
     * Retrieves a single user from users collection
     * @param {string} uid user's primary key
     * @returns {Promise} To be notified when user is retrieved from the database
     */
   async findUserById(uid: string): Promise<any> {
       return await UserModel.findById(uid);
   }

    /**
     * Inserts a new user into the database
     * @param {User} user to be inserted into the database
     * @returns {Promise} To be notified when user is inserted into the database
     */
   async createUser(user: User): Promise<User> {
    const a : any = await UserModel.create(user);
    return new User(a.username, a.password, a.firstName || '', a.lastName||'', a.email||'');
   }

   /**
     * Deletes a user from the database
     * @param {string} uid Primary key of the user
     * @returns {Promise} To be notified when user is deleted from the database
     */
   async deleteUser(uid: string):  Promise<any> {
       return await UserModel.deleteOne({_id: uid});
   }

   /**
     * Updates a particular user in database with new values provided
     * @param {string} uid Primary key of user
     * @param {User} user User object with new values
     * @returns {Promise} To be notified when user is updated in the database
     */
   async updateUser(uid: string, user: any): Promise<any> {
    //    return await UserModel.updateOne({_id: uid}, {$set: user});
    const result = await UserModel.updateOne(
        {_id: uid},
        {$set: user}
        );
    return result.upsertedCount;
   }
}
