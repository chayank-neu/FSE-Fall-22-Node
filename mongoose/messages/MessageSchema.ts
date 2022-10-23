/**
 * @file Implements mongoose schema for Message
 */
import mongoose, { Schema } from "mongoose";

/**
 * @typedef Message Represents Message
 * @property {String} message message
 * @property {String} to user's id message sent to
 * @property {String} from user's id message sent by
 * @property {String} Date date message was sent
 */
const MessageSchema = new mongoose.Schema({
    message: {type: String, required: true},
    to: {type: String, required: true},
    from: {type: String, required: true},
    sentOn: {type: Date, default: Date.now}
}, {collection: 'messages'});
export default MessageSchema;