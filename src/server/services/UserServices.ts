import UserRepository from '../repository/user/UserRepository'
import { UserLoginInputModel } from '../models/user/input/UserLoginInputModel'
import dotenv from 'dotenv'
import { UserDomain } from '../configs/UserDomain'
import { UserRegisterInputModel } from '../models/user/input/UserRegisterInputModel'
import { BadRequestError } from '../models/error/Error'

class UserServices {
    private repo: UserRepository
    private domain: UserDomain;
    constructor() {
        dotenv.config()
        this.repo = new UserRepository();
        this.domain = new UserDomain();
    }
    async login(login: UserLoginInputModel): Promise<[string, number]> {
        const user = await this.repo.getUserByUsername(login.username)
        if(user == null) throw new BadRequestError("User doesnt exist")
        if(!await this.domain.verifyPassword(login.password, user.password)) throw new BadRequestError("Password doesnt match")
        const tokenPromise = await this.domain.createToken(login.username, login.password, this.domain.getExpireTime());
        const expireTime = this.domain.getExpireTime();
        return [tokenPromise, expireTime];
    }
    /*
    async logout(res): Promise<boolean> {

    }
    */
    async register(register: UserRegisterInputModel): Promise<number> {
        const hashedPassword = await this.domain.hashPassword(register.password)
        return await this.repo.createUser(register.username, hashedPassword, register.email)
    }
    async checkAuth(username: string, password: string): Promise<boolean> {
        const user = await this.repo.getUserByUsername(username)
        if(user == null) throw new BadRequestError("User doesnt exist")
        return await this.domain.verifyPassword(password, user.password)
    }
}

export default UserServices
