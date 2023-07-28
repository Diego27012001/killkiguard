import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CamerasService } from '../services/cameras.service';
import { CreateCameraDto } from '../dto/create-camera.dto';
import { UpdateCameraDto } from '../dto/update-camera.dto';
import { Camera } from '../schemas/camera.schemas';

@Controller('cameras')
export class CamerasController {
  constructor(private readonly camerasService: CamerasService) {}

  @Post()
  async create(@Body() createCameraDto: CreateCameraDto): Promise<Camera> {
    return this.camerasService.create(createCameraDto);
  }

  @Get()
  async findAll(): Promise<Camera[]> {
    return this.camerasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Camera> {
    return this.camerasService.findOne(id);
  }

  @Patch(':id')
  async update(@Body() updateCameraDto: UpdateCameraDto): Promise<Camera> {
    return this.camerasService.update(updateCameraDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Object> {
    return this.camerasService.remove(id);
  }
}
