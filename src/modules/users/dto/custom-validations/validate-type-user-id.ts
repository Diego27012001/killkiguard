import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Model } from "mongoose";
import { Role, RoleDocument } from "../../schemas/rol.schemas";

@ValidatorConstraint({ name: 'TypeUserExists', async: true })
@Injectable()
export class TypeUserExistsRule implements ValidatorConstraintInterface {
    constructor(@InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>) { }

    async validate(value: number) {
        try {
            const role = await this.roleModel.findOne({ id: value }).exec();
            return !!role;
        } catch (e) {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return 'El tipo de usuario no existe';
    }
}

export function TypeUserExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'TypeUserExists',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: TypeUserExistsRule,
        });
    };
}
