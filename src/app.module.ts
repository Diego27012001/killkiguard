import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { UsersModule } from './modules/users/users.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
// import { DatabaseProvider } from './config/database/database.provider';
import { CamerasModule } from './modules/cameras/cameras.module';
import { ResidentModule } from './modules/resident/resident.module';
import { IncidentModule } from './modules/incidents/incidents.module';
import { SocketModule } from './config/socket/socket.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FilesModule } from './modules/files/files.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({
      dest: './uploads', // Ruta donde se guardarán los archivos cargados
    }),
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
    ResidentModule,
    IncidentModule,
    FilesModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {

  
}
