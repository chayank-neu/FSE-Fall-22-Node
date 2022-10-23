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
import BookmarkDao from './daos/bookmarks/BookmarkDao';
import FollowDao from './daos/follows/FollowDao';
import LikeDao from './daos/likes/LikeDao';
import MessageDao from './daos/messages/MessageDao';
import TuitDao from './daos/tuits/TuitDao';
import UserDao from './daos/users/UserDao';

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
