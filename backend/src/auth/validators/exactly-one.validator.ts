import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class ExactlyOneConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as Record<string, any>;
    const fields = args.constraints[0] as string[];
    
    const presentFields = fields.filter(field => object[field] !== undefined);
    return presentFields.length === 1;
  }

  defaultMessage(args: ValidationArguments) {
    const fields = args.constraints[0].join(' or ');
    return `Exactly one of ${fields} must be provided`;
  }
}


export function ExactlyOne(fields: string[], validationOptions?: ValidationOptions) {

  return function (target: any) {

    for (const field of fields) {

      registerDecorator({

        target: target,

        propertyName: field,

        options: validationOptions,

        constraints: [fields],

        validator: ExactlyOneConstraint,

      });

    }

  };

}
