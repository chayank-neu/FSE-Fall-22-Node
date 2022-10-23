/**
 * @file Implements mongoose schema for Like
 */
import mongoose, { Schema } from "mongoose";

/**
 * @typedef Like Represents Like
 * @property {String} tuit tuit's id
 * @property {String} likedBy user's id
 */
const LikeSchema = new mongoose.Schema({
   tuit: {type: String, required: true},
    likedBy: {type: String, required: true}
}, {collection: 'likes'});
export default LikeSchema;