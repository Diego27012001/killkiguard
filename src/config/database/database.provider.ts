import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Environment } from "../common";

export const DatabaseProvider: DynamicModule = MongooseModule.forRootAsync({
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
        const isDevelopmentEnv = config.get("NODE_ENV") !== Environment.Production;

        const dbConfig = {
            uri: config.get<string>("MONGO_URI"),
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            autoLoadEntities: true,
            synchronize: isDevelopmentEnv,
            // logging: config.get("DB_LOGGING"),
        };

        return dbConfig;
    }
});