export class NotFoundError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.name = 'Not Found';
        this.status = 404;
    }
}

export class InternalServerError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.name = 'Internal Server';
        this.status = 500;
    }
}

export class BadRequestError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.name = 'Bad request';
        this.status = 405;
    }
}

export class Unauthorized extends Error {
    status: number;
    constructor(message: string) {
        super()
        this.name = 'Unauthorized';
        this.status = 401;
    }
}

export default {
    NotFoundError,
    InternalServerError,
    Unauthorized
};
