/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import BookmarkController from './controllers/bookmarks/BookmarkController';
import FollowController from './controllers/FollowController';
import LikeController from './controllers/LikeController';
import MessageController from './controllers/messages/MessageController';
import TuitController from './controllers/TuitController';

import UserController from './controllers/UserController';
import BookmarkDao from './daos/bookmarks/BookmarkDao';
import FollowDao from './daos/FollowDao';
import LikeDao from './daos/LikeDao';
import MessageDao from './daos/messages/MessageDao';
import TuitDao from './daos/TuitDao';
import UserDao from './daos/UserDao';

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const uri = process.env.MONGODB_URI;

mongoose.connect(uri||'mongodb://localhost:27017/tuiter');


// app.get('/', (req: Request, res: Response) =>
//     res.send('Welcome to Foundation of Software Engineering!!!!'));

// app.get('/hello', (req: Request, res: Response) =>
//     res.send('Welcome to Foundation of Software Engineering!'));


const userDao = new UserDao();
const userController = new UserController(app, userDao);

const tuitDao = new TuitDao();
const tuitController = new TuitController(app, tuitDao);

const likeDao = new LikeDao();
const likeController = new LikeController(app, likeDao);


const followDao = new FollowDao();
const followController = new FollowController(app, followDao);

const bookmarkDao = new BookmarkDao();
const bookmarkController = new BookmarkController(app, bookmarkDao);

const messageDao = new MessageDao();
const messageController = new MessageController(app, messageDao);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
