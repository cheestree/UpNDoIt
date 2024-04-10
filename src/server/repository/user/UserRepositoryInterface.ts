import {User} from "../../models/user/User";

export interface UserRepositoryInterface {
    getUserByUsername: (username: string) => Promise<User | null>
    getUserById: (id: number) => Promise<User | null>
}
