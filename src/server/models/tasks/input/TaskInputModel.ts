import { checkSchema } from 'express-validator';

export class TaskInputModel {
    title!: string;
    description!: string;
    public!: boolean;
}

export const TaskInputModelValidation = checkSchema({
    title: { isLength: { options: { min: 4, max: 20 } } },
    description: { isLength: { options: { min: 4, max: 512 } } },
    public: { isBoolean: true },
});
