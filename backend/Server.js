import express from "express";
import pg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";
import passport from "passport";
import env from "dotenv";
import session from "express-session";
import bodyParser from "body-parser";
import { Strategy as LocalStrategy } from "passport-local";
import nodemailer from "nodemailer";


const app = express();
const port = 4000;
const saltRounds = 10;
const otpExpiryTime = 10 * 60 * 1000

env.config();

app.use(cors({
    origin: ['http://localhost:3000','http://172.16.170.179:3000'],
    credentials: true,
  }));
  
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false,
              httpOnly:true,
              maxAge: 24*60*60*10000,
     },
  }));

  app.use(passport.initialize());
app.use(passport.session());



const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});


db.connect(err => {
    if (err) {
      console.error('Connection error', err.stack);
    } else {
      console.log('Connected to the database');
    }
  });
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  }

  
  const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    port:465,
    secure:true, // Change to your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  
      if (result.rows.length === 0) {
        return done(null, false, { message: "User not found" });
      }
  
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
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


app.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Check if user already exists
    const checkResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists. Please login.' });
    }

    // Generate hashed password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate OTP and store in-memory or database (in-memory for simplicity here)
    const otp = generateOTP();
    const otpExpiresAt = Date.now() + otpExpiryTime;

    // Store OTP in a table for real-world apps (e.g., in-memory here for demo purposes)
    // e.g., 'INSERT INTO otp_verification (email, otp, expiry_time) VALUES (...)'

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification for Signup',
      text: `Hi ${username},\n\nYour OTP for signup is ${otp}. It will expire in 10 minutes.\n\nThank you!`,
    };

    await transporter.sendMail(mailOptions);

    // Insert user into the database but mark as unverified
    const result = await db.query(
      'INSERT INTO users (email, username, hashed_password, is_verified) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, username, hashedPassword, false]
    );

    res.status(201).json({ message: 'Signup successful. Verify email to complete.', otpExpiresAt }); // Remove OTP in prod
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /verify-otp endpoint
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Fetch the stored OTP and expiry (mocking in-memory storage here)
    // Real-world apps will query OTP data from a database table
    // Example: `SELECT * FROM otp_verification WHERE email = $1`

    const storedOtp = 'mocked-otp'; // Replace with actual fetched OTP
    const storedOtpExpiry = Date.now() + otpExpiryTime; // Replace with actual expiry

    if (!storedOtp || storedOtpExpiry < Date.now()) {
      return res.status(400).json({ message: 'OTP expired or invalid.' });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // Mark user as verified
    await db.query('UPDATE users SET is_verified = $1 WHERE email = $2', [true, email]);

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
  
        res.status(200).json({ message: "Login successful", user:req.user });
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

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  