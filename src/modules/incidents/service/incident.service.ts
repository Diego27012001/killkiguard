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
  ) { }

  async create(createIncidentDto: CreateIncidentDto): Promise<Incident> {
    try {
      const { resident, camera, ...incidentData } = createIncidentDto;

      const newIncident = new this.incidentModel({
        ...incidentData,
        resident: resident,
        camera: camera
      });
      console.log(newIncident)
      return await newIncident.save();
    } catch (error) {
      throw new InternalServerErrorException('Error al crear incidencia.', error.message);
    }
  }

  async findAll(): Promise<Incident[]> {
   
      const incident = await this.incidentModel.find().
        populate('resident')
        .populate('camera')
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
  }


  async findOne(id: string): Promise<Incident> {
    try {
      const incident = await this.incidentModel.findById(id)
        .populate('resident')
        .populate('camera')
        .exec();

      if (!incident) {
        throw new NotFoundException('Residente no encontrado.');
      }

      return incident;
    } catch (error) {
      throw new NotFoundException('Algo salió mal.', error.message);
    }
  }



  async remove(id: string): Promise<Object> {
    try {
      const deleteResponse = await this.incidentModel.findByIdAndDelete(id);

      if (!deleteResponse) {
        throw new NotFoundException('Residente no encontrado.');
      }

      return {
        status: HttpStatus.ACCEPTED,
        message: 'Residente eliminado exitosamente.',
      };
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado.');
    }
  }


  async update(updateIncidentDto: UpdateIncidentDto) {
    const { _id, resident, camera, ...userData } = updateIncidentDto;


    let incidentUpdate: IncidentDocument;

    incidentUpdate = await this.incidentModel.findByIdAndUpdate(
      _id,
      {...userData},
      { new: true },
    );

    if (!incidentUpdate) {
      throw new NotFoundException('Incidente no encontrado.');
    }


    const populatedIncident = await this.incidentModel.findById(_id).
        populate('resident')
        .populate('camera')
        .exec();

    return populatedIncident;
  }

}
