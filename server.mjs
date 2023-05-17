import express from "express";
import webservices from "./services/web-services.mjs"
import cors from 'cors'
import url from 'url'
import path from 'path'

const app = express()
const port = 25565
const services = webservices()

app.use(cors())
app.use(express.json())

//  Paths
app.get('/home', services.home)
app.get('/login', services.login)
app.post('/taskadd', services.addtask)

app.listen(port, () => console.log(`Listening at ${port}`))