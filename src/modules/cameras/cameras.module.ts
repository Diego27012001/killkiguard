import { Module } from '@nestjs/common';
import { CamerasService } from './services/cameras.service';
import { CamerasController } from './controllers/cameras.controller';
import { Camera, CameraSchema } from './schemas/camera.schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Camera.name, schema: CameraSchema },
    ]),
  ],
  controllers: [CamerasController],
  providers: [CamerasService]
})
export class CamerasModule {}
