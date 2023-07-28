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
  ) { }

  async create(createCameraDto: CreateCameraDto): Promise<Camera> {
    const { model, serie, brand, description, location, status,
      camImage, installationDate } = createCameraDto;

    let camImageBuffer: Buffer | undefined;
    if (camImage) {
      if (!this.isValidImageFile(camImage)) {
        throw new BadRequestException('El archivo de imagen no es válido.');
      }
      camImageBuffer = Buffer.from(camImage.buffer); // Esto asume que el objeto File en el cliente contiene la propiedad 'buffer' con los datos del archivo en formato Buffer
    }
    if (camImage) {
      camImageBuffer = Buffer.from(camImage.buffer); // Esto asume que el objeto File en el cliente contiene la propiedad 'buffer' con los datos del archivo en formato Buffer
    }

    const newCamera = new this.cameraModel({
      model, serie, brand, description, location, status,
      camImage: camImageBuffer, installationDate
    });

    return await newCamera.save();
  }

  isValidImageFile(file: Express.Multer.File): boolean {
    // Verifica que el tipo de archivo sea una imagen (jpeg, png, etc.)
    if (!file.mimetype || !file.mimetype.includes('image/')) {
      return false;
    }

    // Verifica el tamaño del archivo (2 MB como máximo permitido)
    if (file.size > 2 * 1024 * 1024) {
      return false;
    }

    // Si pasa todas las validaciones, entonces es un archivo de imagen válido
    return true;
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

  async update(updateCameraDto: UpdateCameraDto) {
    const { _id, camImage, ...cameraData } = updateCameraDto;

    let cameraUpdate: CameraDocument;

    cameraUpdate = await this.cameraModel.findByIdAndUpdate(
      cameraData
    );

    if (!cameraUpdate) {
      throw new NotFoundException('Cámara no encontrado.');
    }

    // Si se proporciona una nueva imagen, actualiza el campo 'profileImage' en el documento del usuario
    if (camImage) {
      const camImageBuffer = Buffer.from(camImage.buffer); // Convierte la nueva imagen a un objeto Buffer
      cameraUpdate.camImage = camImageBuffer; // Actualiza el campo 'profileImage' con la nueva imagen
      await cameraUpdate.save(); // Guarda los cambios en la base de datos
    }

    const populatedCamera = await this.cameraModel.findById(_id).exec();

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
