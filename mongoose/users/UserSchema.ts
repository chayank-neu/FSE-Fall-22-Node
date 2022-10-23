/**
 * @file Implements mongoose schema for users
 */
import mongoose from "mongoose";

/**
 * @typedef User Represents User
 * @property {String} username the username of the user
 * @property {String} password the password of the user
 * @property {String} firstName user's first name
 * @property {String} lastName user's last name
 * @property {String} email user's email
 * @property {String} profilePhoto user's profile phot
 * @property {String} headerImage user's header image
 * @property {String} accountType user's accounttype
 * @property {String} maritalStatus user's maritalstatus
 * @property {String} biography user's biogrpahy 
 * @property {Date} dateOfBirth user's dat of birth
 * @property {Date} joined date user joined tuiter
 * @property {Number} location user's location
 */
const UserSchema = new mongoose.Schema({
   username: {type: String, required: true},
   password: {type: String, required: true},
   firstName: String,
   lastName: String,
   email: String,
   profilePhoto: String,
   headerImage: String,
   accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
   maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
   biography: String,
   dateOfBirth: Date,
   joined: {type: Date, default: Date.now},
   location: {
     latitude: {type: Number, default: 0.0},
     longitude: {type: Number, default: 0.0},
   }
}, {collection: 'users'});
export default UserSchema;
