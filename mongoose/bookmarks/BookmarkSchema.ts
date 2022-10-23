/**
 * @file Implements mongoose schema for Bookmark
 */
import mongoose, { Schema } from "mongoose";

/**
 * @typedef Bookmark Represents Bookmark
 * @property {String} bookmarkedTuit tuit's id bookmarked
 * @property {String} bookmarkedBy user's id who bookmarked tuit
 */
const BookmarkSchema = new mongoose.Schema({
    bookmarkedTuit: {type: String, required: true},
    bookmarkedBy: {type: String, required: true}
}, {collection: 'bookmarks'});
export default BookmarkSchema;