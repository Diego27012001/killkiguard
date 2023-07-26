import { Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/users/schemas/user.schemas';
import { Role, RoleSchema } from 'src/modules/users/schemas/rol.schemas';

@Module({
    imports: [
        DatabaseProvider,
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }, // Agrega aquí tus modelos y esquemas al MongooseModule
            { name: Role.name, schema: RoleSchema }, // Agrega aquí tus modelos y esquemas al MongooseModule
        ]),
    ],
    exports: [DatabaseProvider],
})
export class DatabaseModule {}
