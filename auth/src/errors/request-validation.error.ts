import { ValidationError } from "express-validator";
import { CustomError } from "./custom.error";

export class RequestValidationError extends CustomError {
    statusCode = 400
    constructor(public errors: ValidationError[]){
        super('Error validation parameters');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(){
        const formattedErrors = this.errors.map(eachErr => {
            return {
                message: eachErr.msg,
                field: eachErr.param
            }
        })

        return formattedErrors
    }
}