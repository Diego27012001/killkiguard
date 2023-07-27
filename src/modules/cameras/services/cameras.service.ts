import { Injectable, NotFoundException, HttpStatus, HttpException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateCameraDto } from '../dto/create-camera.dto';
import { UpdateCameraDto } from '../dto/update-camera.dto';
import { Model } from 'mongoose';
import { Camera, CameraDocument } from '../schemas/camera.schemas';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CamerasService {
  constructor(
    @InjectModel(Camera.name) private readonly cameraModel: Model<CameraDocument>,
  ) {}

  async create(createCameraDto: CreateCameraDto): Promise<Camera> {
      const { model, serie, brand, description, location, status,
        img, installationDate } = createCameraDto;

      const newCamera = new this.cameraModel({
        model, serie, brand, description, location, status,
        img, installationDate
      });

      return await newCamera.save();
  }

  async findAll(): Promise<Camera[]> {
      const cameras = await this.cameraModel.find().exec();

      if (!cameras) {
        throw new NotFoundException('Algo salió mal.');
      }

      if (cameras.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No hay cámaras para mostrar.',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return cameras;
  }

  async findOne(id: string): Promise<Camera> {
      const camera = await this.cameraModel.findById(id).exec();

      if (!camera) {
        throw new NotFoundException('Usuario no encontrado.');
      }

      return camera;
  }

  async update(id: string, updateCameraDto: UpdateCameraDto) {
      const { ...cameraData } = updateCameraDto;

      let cameraUpdate: CameraDocument;

      cameraUpdate = await this.cameraModel.findByIdAndUpdate(
        cameraData
      );

      if (!cameraUpdate) {
        throw new NotFoundException('Cámara no encontrado.');
      }

      const populatedCamera = await this.cameraModel.findById(id).exec();

      return populatedCamera;
  }

  async remove(id: string): Promise<Object> {
      const deleteResponse = await this.cameraModel.findByIdAndDelete(id);

      if (!deleteResponse) {
        throw new NotFoundException('Cámara no encontrada.');
      }

      return {
        status: HttpStatus.ACCEPTED,
        message: 'Cámara eliminada exitosamente.',
      };
  }
}
