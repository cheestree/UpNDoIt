import Requests from "@/services/requests/Requests";

class UserServices {
    private requests: Requests;
    private readonly url: string;
    constructor(requests: Requests, user_url: string) {
        this.requests = requests;
        this.url = user_url;
    }
    async login(username: string, password: string): Promise<Response> {
        return this.requests.post(this.url + '/login', true, { username: username, password: password });
    }
    async logout(): Promise<boolean> {
        return await this.requests.post(this.url + '/logout', true, null).then(async (response) => {
            return response.ok
        })
    }
    async register(username: string, password: string, email: string): Promise<Response | undefined> {
        return this.requests.post(this.url + '/register', false, { username: username, password: password, email: email });
    }
    async checkAuth(): Promise<boolean> {
        return this.requests.get(this.url + '/auth', true).then(async (response) => {
            return response.ok
        });
    }
}

export default UserServices;
