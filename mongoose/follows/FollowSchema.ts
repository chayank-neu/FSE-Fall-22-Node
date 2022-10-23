/**
 * @file Implements mongoose schema for Follow
 */
import mongoose, { Schema } from "mongoose";

/**
 * @typedef Follow Represents Follow
 * @property {String} userFollowed user's id followed
 * @property {String} userFollowing user's id following
 */
const FollowSchema = new mongoose.Schema({
    userFollowed: {type: String, required: true},
    userFollowing: {type: String, required: true}
}, {collection: 'follows'});
export default FollowSchema;