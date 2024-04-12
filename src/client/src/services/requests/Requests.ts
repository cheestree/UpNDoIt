class Requests {
    async get(url: string, isAuthenticated: boolean): Promise<Response | undefined> {
        try {
            return await fetch('http://localhost:5000' + url, {
                method: 'GET',
                headers: {'Content-type': 'application/json; charset=UTF-8',},
                credentials: isAuthenticated ? 'include' : 'same-origin'
            });
        } catch (error) {
            console.error('Error:', error);
            return undefined;
        }
    }
    async post(url: string, isAuthenticated: boolean, bodyToSend: BodyInit): Promise<Response> {
        return await fetch('http://localhost:5000' + url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8',},
            credentials: isAuthenticated ? 'include' : 'same-origin',
            body: bodyToSend
        });
    }
}

export default Requests;
