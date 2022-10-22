import mongoose, { Schema } from "mongoose";
const FollowSchema = new mongoose.Schema({
    userFollowed: {type: String, required: true},
    userFollowing: {type: String, required: true}
}, {collection: 'follows'});
export default FollowSchema;