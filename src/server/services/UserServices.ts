import UserRepository from '../repository/user/UserRepository'
import * as jose from 'jose';
import { UserLoginInputModel } from '../models/user/input/UserLoginInputModel'
import dotenv from 'dotenv'
import {randomBytes} from 'node:crypto'

class UserServices {
    private repo: UserRepository
    constructor() {
        dotenv.config()
        this.repo = new UserRepository();
    }
    /*
    async register(): Promise<number> {

    }

     */
    async login(login: UserLoginInputModel): Promise<string> {
        const secret = jose.base64url.decode(process.env.PASSWORD_SECRET || 'ABCD')
        const jwtToken = await new jose.EncryptJWT({ login })
          .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
          .setExpirationTime('2h')
          .encrypt(secret);
        return jwtToken
    }
    /*
    async logout(): Promise<boolean> {

    }
    */
}

export default UserServices
