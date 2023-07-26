import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { Environment } from "../common";
import { User, UserSchema } from "../../modules/users/schemas/user.schemas"; // Importa tus modelos y esquemas aquí
import { Role, RoleSchema } from "../../modules/users/schemas/rol.schemas"; // Importa tus modelos y esquemas aquí

export const DatabaseProvider: DynamicModule = MongooseModule.forRootAsync({
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
        const isDevelopmentEnv = config.get("NODE_ENV") !== Environment.Production;

        const dbConfig = {
            uri: config.get<string>("MONGO_URI"),
            dbName: config.get<string>("DB_NAME"),
            auth: {
                username: config.get<string>("DB_USER"),
                password: config.get<string>("DB_PASSWORD"),
            },
        };

        return dbConfig;
    }
});
