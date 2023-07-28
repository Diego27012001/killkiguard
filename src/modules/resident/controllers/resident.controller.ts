import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResidentService } from '../services/resident.service';
import { CreateResidentDto } from '../dto/create-resident.dto';
import { UpdateResidentDto } from '../dto/update-resident.dto';
import { Resident } from '../schemas/resident.entity';

@Controller('residents')
export class ResidentsController {
  constructor(private readonly residentService: ResidentService) { }

  @Post()
  async create(@Body() createResidentDto: CreateResidentDto): Promise<Resident> {
    return this.residentService.create(createResidentDto);
  }

  @Get()
  async findAll(): Promise<Resident[]> {
    return this.residentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Resident> {
    return this.residentService.findOne(id); // Implementa el método findOne en el servicio.
  }

  /*
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto); // Implementa el método update en el servicio.
  }*/

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Object> {
    return this.residentService.remove(id); // Implementa el método remove en el servicio.
  }
}
