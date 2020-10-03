/********************************************************************************************
 *                                                                                          *
 *                  THE BACKEND IS A WHOLE MESS OF LOGICS,                                  *
 *                  FOR ANY QUERY (though i don't know much either) FEEL FREE TO CONTACT ME,*
 *                                                                                          *  
 * *************************************************************************************** */
const path = require('path');
const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');
const connectMongo = require("connect-mongo");

const auth = require("./middleware/auth");
const connectFlash = require("connect-flash");
const edge = require("edge.js");

//------------------All the controllers are below-----------------------//

const showAboutController = require('./controllers/showAbout');
const showPostController = require('./controllers/showPost');
const createPostPageController = require('./controllers/createPostPage');
const createPostLoginController = require('./controllers/createPostLoginController')
const loginUserController = require("./controllers/loginUser");
const login_front_pageUserController = require("./controllers/login_front_pageUser");
const storeUserController = require("./controllers/storeUser");
const showAllPostController = require('./controllers/allPosts.js');
const logoutController = require("./controllers/logout");
const showIndexController = require('./controllers/showIndex');
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");

//------------------All the models used are below-----------------------//

const Post = require("./database/models/Post");
const User = require("./database/models/User");

const app = new express();


app.use(expressSession({secret: "secret"}));    // to keep session records// 

app.use(connectFlash());             // to display flash messages, not much use//   

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({mongooseConnection: mongoose.connection})
  })
  );
  
  /*******************************Add your own Mongo DB, or however it works**************/


  mongoose.connect("mongodb://localhost:27017/blogs", { useNewUrlParser: true, })
  .then(() => "You are now connected to Mongo!")
  .catch((err) => console.error("Something went wrong", err));
  
  
  app.use(fileUpload()); 
  
  app.use(express.static("public"))
  
  app.use(expressEdge.engine);
  
app.use('*/images', express.static('/public/images'));

  app.use("/static", express.static(__dirname + "/public"));
  
  app.set('views', __dirname + '/views');
  
  app.use("*", async (req, res, next) => {
    const currUser = await User.findById(req.session.userId);
    edge.global('auth', req.session.userId, currUser)
    next()
  });
  
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use(bodyParser.json());
  
app.get("/", redirectIfAuthenticated,showIndexController);
  
  app.get("/posts", showAllPostController);

  app.get("/create", createPostPageController);
  app.post('/createLogin', createPostLoginController);
  
  app.get("/about", showAboutController);
  
  app.post("/posts/store", auth, async (req, res) => {
    await Post.create(req.body, (error, post) => {res.redirect("/")})});

  app.get("/post/:id", showPostController);
  
  app.get("/auth/register", redirectIfAuthenticated, (req, res) => {res.render("register", { errors: req.flash("registrationErrors")})});
  
  app.get("/auth/login", redirectIfAuthenticated, (req, res) => {res.render("login")});
  
  app.post("/users/register",redirectIfAuthenticated, storeUserController);
  
  app.post("/users/login",redirectIfAuthenticated, loginUserController);
app.post("/users/login-front-page", redirectIfAuthenticated, login_front_pageUserController);

  app.get("/auth/logout", logoutController);
  
  /*------------------Server setup------------------*/
  
  app.listen(4000, () => {
    console.log('App listening on port 4000 after change')
  });
