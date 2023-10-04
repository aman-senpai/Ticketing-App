import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 400;

    constructor() {
        super("Router not found");

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: "Not found" }]
    }
}
