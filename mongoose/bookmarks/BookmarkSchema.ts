import mongoose, { Schema } from "mongoose";
const BookmarkSchema = new mongoose.Schema({
    bookmarkedTuit: {type: String, required: true},
    bookmarkedBy: {type: String, required: true}
}, {collection: 'bookmarks'});
export default BookmarkSchema;