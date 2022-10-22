import mongoose, { Schema } from "mongoose";
const MessageSchema = new mongoose.Schema({
    message: {type: String, required: true},
    to: {type: String, required: true},
    from: {type: String, required: true},
    sentOn: {type: Date, default: Date.now}
}, {collection: 'messages'});
export default MessageSchema;