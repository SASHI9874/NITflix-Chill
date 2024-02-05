require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./Db/conection");
const PORT = 6005;
const session = require("express-session");
const passport = require("passport");
const OAuth2Streategy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/userSchema");
const clientid = process.env.client_ID;
const clientSecret = process.env.client_secret;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

// setup session
app.use(
  session({
    secret: "2346ewubfye",
    resave: false,
    saveUninitialized: true,
  })
);

// setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Streategy(
    {
      clientID: clientid,
      clientSecret: clientSecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("profile",profile);
      try {
        let user = await userdb.findOne({ googleId: profile.id });

        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            address: "abc",
          });

          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//initial google auth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/sucess",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.get("/login/sucess", async (req, res) => {
  // console.log("reqqqqqq",req.user)

  if (req.user) {
    res.status(200).json({ message: "user Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorised" });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000");
  });
});

// Data submission route (POST method)

app.post("/", async (req, res) => {
  try {
    const userid = req.body.id;
    const address = req.body.address;
    //   console.log("Received data:", req.body);
    const user = await userdb.findById(userid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.address = address;
    const updatedUser = await user.save();
    res.json(updatedUser);
    console.log("Data updated sucessfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.status(200).json("server start");
});

// nodemon .\app.js
app.listen(PORT, () => {
  console.log(`server start at port no ${PORT}`);
});
