import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { UsersModule } from './modules/users/users.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
// import { DatabaseProvider } from './config/database/database.provider';
import { CamerasModule } from './modules/cameras/cameras.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRootAsync({
    //   useFactory: databaseProvider,
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGO_URI'),
    //     useNewUrlParser: true,
    //     dbName: configService.get<string>('DB_NAME'),
    //   }),
    //   inject: [ConfigService],
    // }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CamerasModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {
}
