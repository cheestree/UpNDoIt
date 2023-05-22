import * as dotnv from 'dotenv'
import pkg from 'pg';
const { Client } = pkg;

dotnv.config()

export default function(){
    return {
        createaccount : createAccount
    }

    async function createAccount(info){
        let success = true
        const dbuser = process.env.DB_USER
        const dbpass = process.env.DB_KEY
        const dbhost = process.env.DB_HOST
        const dbport = process.env.DB_PORT
        const client = new Client({
            user: dbuser,
            password: dbpass,
            port: dbport,
            host: dbhost
        })
        try{
            await client.connect(); 
            await client.query('BEGIN')
            const queryText = `insert into accounts(username, password, birth) values ($1, $2, $3)`
            await client.query(queryText, [info.registername, info.registerpass, info.date])
            await client.query('COMMIT')
        }catch(e){
            await client.query('ROLLBACK')
            success = false
        } finally {
            await client.end()
        }
        return success
    }
}