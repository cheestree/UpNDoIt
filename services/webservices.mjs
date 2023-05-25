import db from '../database/accountdb.mjs'
import * as utils from './utils.mjs'

export default function () {
    return {
        register: register,
        login: login,
        logout: logout,
        taskadd: taskadd,
        taskgetall: taskgetall,
        taskdelete: taskdelete,
        taskmodify: taskmodify,
        checkauth: checkauth,
    }
    
    async function register(req, rsp) {
        let data = req.body
        let isSuccess = await db().createaccount(data)
        rsp.send(isSuccess)
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

    async function taskadd(req, rsp) {
        let payload = getpayload(req)
        req.body.taskuserid = payload.id
        let isSuccess = await db().taskadd(req.body)
        rsp.status(200).json({ success: isSuccess })
    }

    async function taskgetall(req, rsp) {
        let payload = getpayload(req)
        let rows = await db().taskgetall(payload.id)
        if(rows != false) rows.map(row => row.taskdate = parsePostgreSQLTimestamp(row.taskdate))
        rsp.status(200).json(rows)
    }

    async function taskdelete(req, rsp){
        let rows = await db().taskdelete(req.body.taskid)
        if(rows == false) rsp.status(404)
        rsp.status(200).json({ success: rows })
    }

    async function taskmodify(req, rsp){
        let rows = await db().taskmodify(req.body)
        if(rows == false) rsp.status(404)
        rsp.status(200).json({ success: rows })
    }

    async function checkauth(req, rsp) {
        let isGood = verifyToken(req.cookies['customcookie'])
        rsp.status(200).json({ success: isGood, cookies: req.cookies['customcookie'] })
    }
    
}