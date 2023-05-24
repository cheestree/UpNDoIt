import db from '../database/accountdb.mjs'
import jwt from 'jsonwebtoken'
import jwtDecode from 'jwt-decode'

export default function () {
    return {
        addtask: addtask,
        login: login,
        logout: logout,
        register: register,
        checkauth: checkauth,
        gettasks: gettasks
    }

    async function login(req, rsp) {
        let data = req.body
        let userfound = await db().userexists(data.username)
        if (userfound && await db().matchpass(data.password, userfound.password)) {
            const accessToken = createToken({ 'id': userfound.userid })
            rsp.cookie('customcookie', accessToken, { httpOnly: true, secure: true, SameSite: "none" })
            rsp.status(200).json({ success: true });
        } else {
            rsp.status(401).json({ message: 'Invalid username or password' });
        }
    }

    function logout(req, rsp) {
        rsp.clearCookie('customcookie');
        rsp.status(200).redirect('/login');
    }

    async function register(req, rsp) {
        let data = req.body
        let isSuccess = await db().createaccount(data)
        rsp.send(isSuccess)
    }

    async function checkauth(req, rsp) {
        let isGood = verifyToken(req.cookies['customcookie'])
        rsp.status(200).json({ success: isGood, cookies: req.cookies['customcookie'] })
    }

    async function addtask(req, rsp) {
        let payload = getpayload(req)
        req.body.userid = payload.id
        let isSuccess = await db().addtask(req.body)
        rsp.status(200).json({ success: isSuccess })
    }

    async function gettasks(req, rsp) {
        let payload = getpayload(req)
        let rows = db().gettasks(payload.id)
        console.log(rows)
        rsp.status(200)
    }

    async function getpayload(req) {
        let cookie = req.cookies['customcookie']
        let tokens = cookie.split('.')
        let payload = JSON.parse(Buffer.from(tokens[1], 'base64').toString('utf8'))
        return payload
    }

    function createToken(payload) {
        return jwt.sign(payload, 'keyboardcat', { expiresIn: '1h' })
    }

    function verifyToken(token) {
        if (token != null) {
            return jwt.verify(token, 'keyboardcat')
        } else {
            return null
        }
    }
    
}