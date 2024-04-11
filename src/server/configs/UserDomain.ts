import * as jose from 'jose'
import { genSalt, hash, compare } from 'bcrypt'

export class UserDomain {
    constructor() {

    }
    getExpireTime(hours: number = 2): number {
        const millisecondsInHour: number = 3600000;
        return hours * millisecondsInHour;
    }

    async createToken(user: string, password: string, expiration: number): Promise<string> {
        const secret = jose.base64url.decode(process.env.PASSWORD_SECRET || 'ABCD')
        return await new jose.EncryptJWT({ user: user, password: password })
          .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
          .setExpirationTime(expiration+'h')
          .encrypt(secret);
    }
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const salt = await genSalt(saltRounds);
        const hashedPassword = await hash(password, salt);
        return hashedPassword;
    }
    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }
}
