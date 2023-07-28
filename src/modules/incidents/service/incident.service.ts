import { Injectable, NotFoundException, HttpStatus, HttpException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateIncidentDto } from '../dto/create-incident.dto';
import { UpdateIncidentDto } from '../dto/update-incident.dto';
import { Model } from 'mongoose';
import { Incident, IncidentDocument } from '../schemas/incident.schemas';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectModel(Incident.name) private readonly incidentModel: Model<IncidentDocument>,
  ) {}

  async create(createIncidentDto: CreateIncidentDto): Promise<Incident> {
    try {
      const { ...incidentData } = createIncidentDto;

      const newIncident = new this.incidentModel({
        incidentData,
      });

      return await newIncident.save();
    } catch (error) {
      throw new InternalServerErrorException('Error al crear incidencia.');
    }
  }

  //ALL incident
  async findAll(): Promise<Incident[]> {
    try {
      const incident = await this.incidentModel.find().
      populate('resident')
      .populate('camare')
      .exec();

      if (!incident) {
        throw new NotFoundException('Algo salió mal.');
      }

      if (incident.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No hay residentes para mostrar.',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return incident;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener incidencias.');
    }
  }

  
}
