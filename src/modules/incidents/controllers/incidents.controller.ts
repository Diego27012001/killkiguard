import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncidentsService } from '../service/incident.service';
import { CreateIncidentDto } from '../dto/create-incident.dto';
import { UpdateIncidentDto } from '../dto/update-incident.dto';
import { Incident } from '../schemas/incident.schemas';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  async create(@Body() createIncidentDto: CreateIncidentDto): Promise<Incident> {
    return this.incidentsService.create(createIncidentDto);
  }

  @Get()
  async findAll(): Promise<Incident[]> {
    return this.incidentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Incident> {
    return this.incidentsService.findOne(id);
  }
  
  @Patch()
  async update(@Body() updateUserDto: UpdateIncidentDto): Promise<Incident> {
    return this.incidentsService.update(updateUserDto); 
  }

  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Object> {
    return this.incidentsService.remove(id);
  }
}
