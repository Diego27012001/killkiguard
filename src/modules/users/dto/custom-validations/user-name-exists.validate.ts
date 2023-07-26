import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Model } from "mongoose";
import { User, UserDocument } from "../../schemas/user.schemas";

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async validate(value: string) {
        try {
            const user = await this.userModel.findOne({ username: value }).exec();
            return !user;
        } catch (e) {
            return true;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return 'El usuario ingresado ya existe';
    }
}

export function UserExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'UserExists',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: UserExistsRule,
        });
    };
}
