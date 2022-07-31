import { ValidationError } from "class-validator";
import { FieldError } from "src/types";


export const convertValidationErrors = (validationErrors: ValidationError[]): FieldError[] => {
  return validationErrors.map(e => ({
    field: e.property,
    message: Object.values(e.constraints || {_: 'unknow error'})[0]
  }));
}
