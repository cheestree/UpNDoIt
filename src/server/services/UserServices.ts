import UserRepository from '../repository/user/UserRepository'
import { UserLoginInputModel } from '../models/user/input/UserLoginInputModel'
import { UserDomain } from '../configs/UserDomain'
import { UserRegisterInputModel } from '../models/user/input/UserRegisterInputModel'
import { BadRequestError } from '../models/error/Error'
import {Credentials} from "../models/user/Credentials";

class UserServices {
    private repo: UserRepository
    private domain: UserDomain;
    constructor() {
        this.repo = new UserRepository();
        this.domain = new UserDomain();
    }
    async login(login: UserLoginInputModel): Promise<[string, object]> {
        const user = await this.repo.getUserByUsername(login.username)
        if(user == null) throw new BadRequestError("User doesnt exist")

        if(!await this.domain.verifyPassword(login.password, user.password)) throw new BadRequestError("Password doesnt match")

        const tokenPromise = await this.domain.createToken(user.id, login.username, login.password, this.domain.getExpireTime());
        const expireTime = this.domain.getExpireTime();
        const options = {
            httpOnly: true,
            secure: true,
            maxAge: expireTime
        }
        return [tokenPromise, options];
    }
    /*
    async logout(res): Promise<boolean> {

    }
    */
    async register(register: UserRegisterInputModel): Promise<number> {
        const hashedPassword = await this.domain.hashPassword(register.password)
        const id =  await this.repo.createUser(register.username, hashedPassword, register.email)
        if(id == null) throw new BadRequestError("Something happened while registering")
        return id
    }
    async checkAuth(token: string): Promise<Credentials | null> {
        return await this.domain.validateToken(token)
    }
}

export default UserServices
