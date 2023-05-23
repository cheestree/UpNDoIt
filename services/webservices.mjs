import url from 'url'
import db from '../database/accountdb.mjs'
import jwt from 'jsonwebtoken'

export default function(){
    return {
        addtask : addtask,
        login : login,
        register : register
    }

    async function login(req, rsp){
        let data = req.body
        let userfound = await db().userexists(data.username)
        if (userfound && db().matchpass(data.password, userfound.password)){
            const accessToken = createToken({id: userfound.id})
            rsp.cookie('test', accessToken, {httpOnly: true})
            rsp.status(200).json({ success: true });
        } else {
            rsp.status(401).json({ message: 'Invalid username or password'});
        }
    }

    async function register(req, rsp){
        let data = req.body
        console.log(data)
        let isSuccess = await db().createaccount(data)
        rsp.send(isSuccess)
    }

    async function addtask(req, rsp){
        let data = req.body
        console.log(data)
        rsp.send('Data Received: ' + JSON.stringify(data));
    }    

    function createToken(payload){
        return jwt.sign(payload, 'keyboardcat', { expiresIn: '30min' })
    } 

    function verifyToken(token){
        return jwt.verify(token, SECRET_KEY)
    }
}