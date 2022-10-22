import mongoose, { Schema } from "mongoose";
const LikeSchema = new mongoose.Schema({
   tuit: {type: String, required: true},
    likedBy: {type: String, required: true}
}, {collection: 'likes'});
export default LikeSchema;