import url from 'url'
import db from '../database/account-db.mjs'
import { use } from 'chai';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default function(){
    return {
        addtask : addtask,
        login : login,
        register : register
    }

    async function login(req, rsp){
        let data = req.body
        console.log(data)
        rsp.send('Data Received: ' + JSON.stringify(data));
    }

    async function register(req, rsp){
        let data = req.body
        let isSuccess = await db().createaccount(data)
        console.log(isSuccess)
        if(isSuccess){
            rsp.send("Account created successfully!")
        }else{
            rsp.send("There was an error creating your account!")
        }
    }

    async function addtask(req, rsp){
        let data = req.body
        console.log(data)
        rsp.send('Data Received: ' + JSON.stringify(data));
    }
}