/**
 * @file Implements mongoose schema for Dislike
 */
import mongoose, { Schema } from "mongoose";

/**
 * @typedef Dislike Represents Dislike
 * @property {String} tuit tuit's id
 * @property {String} dislikedBy user's id
 */
const DislikeSchema = new mongoose.Schema({
   tuit: {type: String, required: true},
    dislikedBy: {type: String, required: true}
}, {collection: 'dislikes'});
export default DislikeSchema;