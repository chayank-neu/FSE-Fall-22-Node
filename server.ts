/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
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

// connect to the database
mongoose.connect(uri||'mongodb://localhost:27017/tuiter');

// create RESTful Web service API
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
