import * as dotnv from 'dotenv'
import pkg from 'pg';
import * as bcrypt from 'bcrypt'
const { Client } = pkg;

dotnv.config()

export default function(){
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

    return {
        matchpass : matchPassword,
        userexists : userExists,
        createaccount : createAccount
    }

    async function matchPassword(password, hashPassword) {
        try {
          if (!password || !hashPassword) {
            throw new Error('Missing password or hashPassword argument');
          }
      
          const match = await bcrypt.compare(password, hashPassword);
          return match;
        } catch (error) {
          console.error('Error in matchPassword:', error);
          throw error;
        }
      }

    async function userExists(info){
        await client.connect();
        const data = await client.query(
            `select * from accounts where username=$1`,
            [info])
        if (data.rowCount == 0){
            await client.end()
            return false; 
        }
        return data.rows[0];
    }

    async function createAccount(info){
        let success = true
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(info.password, salt);
        console.log(info)
        console.log(hashpass)
        try{
            await client.connect(); 
            await client.query('BEGIN')
            const queryText = `insert into accounts(username, password, birth) values ($1, $2, $3)`
            await client.query(queryText, [info.username, hashpass, info.date])
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