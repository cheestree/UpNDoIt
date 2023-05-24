import express from "express";
import webservices from "./services/webservices.mjs"
import cors from 'cors'
import * as dotnv from 'dotenv'
import bodyParser from 'body-parser'
import multer from 'multer'
import cookieParser from 'cookie-parser'

dotnv.config()

const app = express()
const port = 25565
const services = webservices()
const upload = multer()

app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

//  Paths
app.post('/checkauth', services.checkauth)
app.post('/logout', services.logout)
app.post('/taskadd', services.addtask)
app.post('/login', services.login)
app.post('/register', services.register)

app.listen(port, () => console.log(`Listening at ${port}`))