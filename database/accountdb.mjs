import * as dotnv from 'dotenv'
import pkg from 'pg';
import * as bcrypt from 'bcrypt'
const { Client } = pkg;

dotnv.config()

export default function () {
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
        matchpass: matchPassword,
        userexists: userExists,
        createaccount: createAccount,
        taskadd: taskadd,
        taskgetall: taskgetall,
        taskdelete: taskdelete,
        taskmodify: taskmodify
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

    async function userExists(info) {
        await client.connect();
        const data = await client.query(`select * from accounts where username=$1`, [info])
        if (data.rowCount == 0) {
            await client.end()
            return false;
        }
        return data.rows[0];
    }

    async function createAccount(info) {
        let success = true
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(info.password, salt);
        try {
            await client.connect();
            await client.query('BEGIN')
            const queryText = `insert into accounts(username, password, birth) values ($1, $2, $3)`
            await client.query(queryText, [info.username, hashpass, info.date])
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            success = false
        } finally {
            await client.end()
        }
        return success
    }

    async function taskadd(info) {
        let success = true
        try {
            await client.connect();
            await client.query('BEGIN')
            const queryText = `insert into tasks(taskuserid, taskname, taskdescription, taskdate) values ($1, $2, $3, $4)`
            await client.query(queryText, [info.taskuserid, info.taskname, info.taskdesc, info.taskdate])
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            success = false
        } finally {
            await client.end()
        }
        return success
    }

    async function taskdelete(info){
        let success = true
        try {
            await client.connect();
            await client.query('BEGIN')
            const queryText = `delete from tasks where taskid=$1`
            await client.query(queryText, [info])
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            success = false
        } finally {
            await client.end()
        }
        return success
    }

    async function taskmodify(info) {
        let success = true
        try {
            await client.connect();
            await client.query('BEGIN')
            const queryText = `update tasks set taskname=$2 taskdescription=$3 where taskid=$1`
            await client.query(queryText, [info.taskid, info.taskname, info.taskdesc])
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            success = false
        } finally {
            await client.end()
        }
        return success
    }

    async function taskgetall(info) {
        const queryText = `select * from tasks where taskuserid=$1 order by taskdate desc   `
        await client.connect();
        const data = await client.query(
            queryText,
            [info])
        if (data.rowCount == 0) {
            await client.end()
            return false;
        }
        return data.rows;
    }
}