/**
 * @file Implements mongoose schema for Tuit
 */
import mongoose from "mongoose";

/**
 * @typedef Tuit Represents Tuit
 * @property {String} tuit tuit's message
 * @property {Date} postedOn tuit posted on
 * @property {String} postedBy tuit posted by
 */
const TuitSchema = new mongoose.Schema({
   tuit: String,
   postedOn: {type: Date, default: Date.now},
   postedBy: {type: String, required: true},
}, {collection: 'tuits'});
export default TuitSchema;