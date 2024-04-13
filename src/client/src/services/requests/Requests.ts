class Requests {
    async get(url: string, isAuthenticated: boolean): Promise<Response> {
        return await fetch('http://localhost:5000' + url, {
            method: 'GET',
            headers: {'Content-type': 'application/json; charset=UTF-8',},
            credentials: isAuthenticated ? 'include' : 'same-origin'
        });
    }
    async post(url: string, isAuthenticated: boolean, bodyToSend: object | null): Promise<Response> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            credentials: isAuthenticated ? 'include' : 'same-origin',
        };

        if(bodyToSend) requestOptions.body = JSON.stringify(bodyToSend);

        return await fetch('http://localhost:5000' + url, requestOptions);
    }
    async delete(url: string, isAuthenticated: boolean): Promise<Response> {
        const requestOptions: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            credentials: isAuthenticated ? 'include' : 'same-origin',
        };

        return await fetch('http://localhost:5000' + url, requestOptions);
    }
}

export default Requests;
