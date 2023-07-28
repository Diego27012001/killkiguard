import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

// Validador de tipo de archivo (MIME type)
export function IsMimeType(mimeTypes: string[], validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMimeType',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [mimeTypes],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value instanceof Buffer) {
            const [mimeTypes] = args.constraints;
            const mimeType = value.slice(0, 4).toString('hex');
            return mimeTypes.includes(mimeType);
          }
          return false; // Devuelve false si el valor no es un Buffer válido (no es una imagen)
        },
      },
    });
  };
}

// Validador de tamaño máximo de archivo
export function MaxFileSize(size: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'maxFileSize',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [size],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value instanceof Buffer) {
            const [size] = args.constraints;
            return value.length <= size;
          }
          return false; // Devuelve false si el valor no es un Buffer válido (no es una imagen)
        },
      },
    });
  };
}
