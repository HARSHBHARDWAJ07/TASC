import express from "express";
import pg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";
import passport from "passport";
import env from "dotenv";
import session from "express-session";
import bodyParser from "body-parser";import GoogleStragy from "passport-google-oauth2";
import { Strategy as LocalStrategy } from "passport-local";
import nodemailer from "nodemailer";
import connectPgSimple from 'connect-pg-simple';
 import evaluateRoutes from "./routes/evaluateRoutes.js";
 import userPointsRoutes from "./routes/userPointsRoutes.js";



const app = express();
const port = 5000;
const saltRounds = 10;
const pgSession = connectPgSimple(session);

env.config();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: ['https://tasc-so9j.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.set('trust proxy', 1)

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});


const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});



app.use((err, req, res, next) => {
    logger.error(`[${req.method}] ${req.url} - ${err.message}`);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  });
  
  
const initializeDatabase = async () => {
  try {
   await  db.query(`
      CREATE TABLE IF NOT EXISTS users (
        email VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        hashed_password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS otp_store (
        email VARCHAR(255) PRIMARY KEY,
        otp VARCHAR(6) NOT NULL,
        expires_at TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS user_points (
        user_id VARCHAR(255) REFERENCES users(email),
        category_saving INT DEFAULT 0,
        category_taxes INT DEFAULT 0,
        category_credit INT DEFAULT 0,
        category_debtmanagement INT DEFAULT 0,
        category_budgeting INT DEFAULT 0,
        PRIMARY KEY (user_id)
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_otp_store_email ON otp_store(email);
      CREATE INDEX IF NOT EXISTS idx_user_points_user ON user_points(user_id);
   `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        sid varchar NOT NULL PRIMARY KEY,
        sess json NOT NULL,
        expire timestamp(6) NOT NULL
      );
    `);

    await db.query(`
      CREATE INDEX IF NOT EXISTS IDX_user_sessions_expire 
      ON user_sessions (expire);
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1); 
  }
};



db.connect(async (err) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
    await initializeDatabase(); 
  }
});
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Connected to the database');
    release();
  }
});


app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'user_sessions',
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
  },
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


    
    app.use("/api", evaluateRoutes);
    app.use("/api", userPointsRoutes);


  
    function generateOTP() {
      return Math.floor(100000 + Math.random() * 900000).toString(); 
    }
  
    
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
  
    const sendMail = async ({ to, subject, html }) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
      };
    
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${to}`);
      } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
      }
    };
   
  
  
    passport.use(
      "google",
      new GoogleStragy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:"http:localhost:3000/auth/google",
        userProfileURL:"https://www.googleapis.com/oath2/v3/userinfo",
      },
        async(accessToken , refreshToken ,profile, cb )=>{
  console.log(profile);
      })
    );
  
    
    passport.use("local",
      new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    }, async (email, password, done) => {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    
        if (result.rows.length === 0) {
          return done(null, false, { message: "Invalid email or password." });
        }
    
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.hashed_password);
    
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid email or password." });
        }
      } catch (err) {
        return done(err);
      }
    }));
    
    passport.serializeUser((user, done) => {
      done(null, user.email); 
    });
    
    passport.deserializeUser(async (email, done) => {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    
        if (result.rows.length > 0) {
          done(null, result.rows[0]); 
        } else {
          done(new Error("User not found"), null);
        }
      } catch (err) {
        done(err, null);
      }
    });
  
  
    app.get("/auth/google", passport.authenticate("google" , {
      scope:["profile" , "email"],
    })
  );
  
  
  app.post('/signup', async (req, res) => {
    const { email } = req.body;
  
    try {
      
      const checkResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  
      if (checkResult.rows.length > 0) {
        return res.status(400).json({ message: 'User already exists. Please login.' });
      }
  
    
      const otpExpiryTime = 10 * 60 * 1000;
      const currentotp = generateOTP();
      const otpExpiresAt = new Date(Date.now() + otpExpiryTime).toISOString();
  
     
  
      await sendMail({
        to: email,
        subject: 'Email Verification for Signup',
        html: `<p>Hi,</p>
               <p>Your OTP for signup is <strong>${currentotp}</strong>. It will expire in 10 minutes.</p>
               <p>Thank you!</p>`,
      });
  
      await db.query(
        "INSERT INTO otp_store (email, otp, expires_at) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET otp = $2, expires_at = $3",
        [email, currentotp, otpExpiresAt]
      );
       
     
  
      res.status(201).json({ message:'otp send successfully', otpExpiresAt }); 
    } catch (err) {
      console.error('Unexpected error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  app.post('/verify-otp', async (req, res) => {
    const { email, otp , username , password } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    try {
      
      const otpResult = await db.query("SELECT otp, expires_at FROM otp_store WHERE email = $1", [email]);
       
      if (otpResult.rows.length === 0) {
        return res.status(400).json({ message: "No OTP found for this email." });
      }
  
     
    
      const { otp: storedOtp, expires_at: expiresAt } = otpResult.rows[0];
    
  
      if (storedOtp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP.' });
      }
  
      if (new Date(expiresAt) < new Date()) {
        return res.status(400).json({ message: "OTP expired." });
      }
  
      await db.query('INSERT INTO users (email, username, hashed_password) VALUES ($1, $2, $3) RETURNING *',
        [email, username, hashedPassword]);
  
        await db.query("DELETE FROM otp_store WHERE email = $1", [email]);
  
      res.status(200).json({ message: 'Email verified successfully.' });
    } catch (err) {
      console.error('Unexpected error during verification:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
    
    app.post("/login", (req, res, next) => {
      passport.authenticate("local", (err, user, info ) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });
    
        req.logIn(user, (err) => {
          if (err) return next(err);
          console.log('user:', req.user);
          const { email, username } = req.user;
          res.status(200).json({ message: "Login successful", user: { email, username }});
        });
      })(req, res, next);
    });
    
    app.get("/profile", async (req, res) => {
      console.log("Session info:", req.session);
      console.log("Is Authenticated:", req.isAuthenticated());
      console.log("User:", req.user);
    
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
       else {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [req.user.email]);
        if (result.rows.length > 0) {
          console.log('Authenticated user:', result.rows[0]);
          return res.status(200).json({ user: result.rows[0], status: "ok" });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
       }
    });

    app.get("/user", async(req,res)=>{
      console.log("Session info:", req.session);
      console.log("Is Authenticated:", req.isAuthenticated());
      console.log("User:", req.user);
    
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
       else {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [req.user.email]);
        if (result.rows.length > 0) {
          console.log('Authenticated user:', result.rows[0]);
          return res.status(200).json({ user: result.rows[0], status: "ok" });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
       }


    });
  
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    
