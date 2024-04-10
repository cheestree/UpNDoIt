import { checkSchema } from 'express-validator';

export class TaskInputModel {
    title!: string;
    public!: boolean;
    description!: string;
}

export const TaskInputModelValidation = checkSchema({
    title: { isLength: { options: { min: 4, max: 20 } } },
    public: { isBoolean: true },
    description: { isLength: { options: { min: 4, max: 512 } } },
});
