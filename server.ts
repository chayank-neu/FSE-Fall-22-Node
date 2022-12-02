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
import DislikeController from './controllers/dislikes/DislikeController';
import MessageController from './controllers/messages/MessageController';
import TuitController from './controllers/tuits/TuitController';
import UserController from './controllers/users/UserController';
import AuthenticationController from './controllers/auth/auth-controller';


const cors = require('cors')
const session = require("express-session");

const uri = process.env.MONGODB_URI;
// connect to the database for CRUD
mongoose.connect(uri||'mongodb://localhost:27017/tuiter');

const app = express();

app.use(
    cors({
       credentials: true,
       origin: process.env.CORS_ORIGIN
           ? process.env.CORS_ORIGIN
           : "http://localhost:3000",
    })
);

let sess = {
    secret: "C[Ps9E%q6woaip",
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: (process.env.ENV ? process.env.ENV : "dev") === "production" ? "none" : "lax",
        secure: process.env.ENV === "production",
    },
};

if (process.env.ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
 }

app.use(session(sess));

app.use(express.json());


// create RESTful Web service API
TuitController.getInstance(app)
UserController.getInstance(app);
LikeController.getInstance(app);
DislikeController.getInstance(app);
FollowController.getInstance(app);
BookmarkController.getInstance(app);
MessageController.getInstance(app);
AuthenticationController(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
