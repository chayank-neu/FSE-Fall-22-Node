/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import BookmarkController from './controllers/bookmarks/BookmarkController';
import FollowController from './controllers/follows/FollowController';
import LikeController from './controllers/likes/LikeController';
import MessageController from './controllers/messages/MessageController';
import TuitController from './controllers/tuits/TuitController';
import UserController from './controllers/users/UserController';

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const uri = process.env.MONGODB_URI;

mongoose.connect(uri||'mongodb://localhost:27017/tuiter');

TuitController.getInstance(app)
UserController.getInstance(app);
LikeController.getInstance(app);
FollowController.getInstance(app);
BookmarkController.getInstance(app);
MessageController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
