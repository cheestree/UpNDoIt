import db from '../database/accountdb.mjs'
import jwt from 'jsonwebtoken'

export default function(){
    return {
        addtask : addtask,
        login : login,
        logout : logout,
        register : register,
        checkauth : checkauth,
        getcookie : getcookie
    }

    async function login(req, rsp){
        let data = req.body
        let userfound = await db().userexists(data.username)
        if (userfound && await db().matchpass(data.password, userfound.password)){
            const accessToken = createToken({id: userfound.id})
            rsp.cookie('customcookie', accessToken, { httpOnly: true, secure: false, SameSite : "none" })
            rsp.status(200).json({ success: true });
        } else {
            rsp.status(401).json({ message: 'Invalid username or password'});
            return
        }
    }

    function logout(req, rsp) {
        rsp.clearCookie('customcookie');
        rsp.status(200).redirect('/login');
    }

    async function register(req, rsp){
        let data = req.body
        let isSuccess = await db().createaccount(data)
        rsp.send(isSuccess)
    }

    async function checkauth(req, rsp) {
        let isGood = verifyToken(req.cookies['customcookie'])
        rsp.status(200).json({success: isGood, cookies: req.cookies['customcookie']})
    }

    async function addtask(req, rsp){
        let data = req.body
        rsp.send('Data Received: ' + JSON.stringify(data));
    }    

    async function getcookie(req, rsp){
        rsp.send(req.cookies)
    }

    function createToken(payload){
        return jwt.sign(payload, 'keyboardcat', { expiresIn: '30min' })
    } 

    function verifyToken(token){
        if(token != null){
            return jwt.verify(token, 'keyboardcat')
        }else{
            return null
        }
    }
}