import express from "express";
import webservices from "./services/webservices.mjs"
import cors from 'cors'
import * as dotnv from 'dotenv'
import session from 'express-session'
import bodyParser from 'body-parser'
import multer from 'multer'
import cookieParser from 'cookie-parser'

dotnv.config()

const app = express()
const port = 25565
const services = webservices()
const upload = multer()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true
}))

//  Paths
app.post('/taskadd', checkSessionAndExecute, services.addtask)
app.post('/login', services.login)
app.post('/register', services.register)

app.listen(port, () => console.log(`Listening at ${port}`))

function checkSessionAndExecute(req, res, next) {
  if (req.session && req.session.user) {
    // Session and user data exist, proceed to the next middleware or execute the function
    next(); // Proceed to the next middleware or function
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}