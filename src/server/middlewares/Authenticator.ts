import { RequestHandler } from 'express'
import { base64url, jwtDecrypt, SignJWT } from 'jose'
import { Unauthorized } from '../models/error/Error'
import UserServices from '../services/UserServices'
import { Credentials } from '../models/user/Credentials'

export const Authenticator: RequestHandler = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        if (!cookie || !cookie.token) {
            throw new Unauthorized('Token not found');
        }

        const secret = base64url.decode(process.env.PASSWORD_SECRET || 'ABCD');
        const decryptedToken = await jwtDecrypt(cookie.token, secret);

        if (!decryptedToken || !decryptedToken.payload || !decryptedToken.payload.login) {
            throw new Unauthorized('Invalid token');
        }

        const creds = decryptedToken.payload.login as Credentials;
        const isValid = await new UserServices().checkAuth(creds.username, creds.password);

        if(!isValid) throw new Unauthorized('Invalid token');

        const refreshedToken = await new SignJWT({ login: creds })
          .setProtectedHeader({ alg: 'dir', enc: 'HS256' })
          .setExpirationTime('2h')
          .sign(secret);

        res.cookie('token', refreshedToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7200000
        });
        console.log(decryptedToken.payload.login);
        next()
    }catch (error){
        next(error)
    }
}
