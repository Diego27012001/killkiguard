import { Injectable, NotFoundException, HttpStatus, HttpException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResidentDto } from '../dto/create-resident.dto';
import { UpdateResidentDto } from '../dto/update-resident.dto';
import { Contact, ContactDocument } from '../schemas/contact.entity';
import { Resident, ResidentDocument } from '../schemas/resident.entity';


@Injectable()
export class ResidentService {
  constructor(
    @InjectModel(Resident.name) private readonly residentModel: Model<ResidentDocument>,
    @InjectModel(Contact.name) private readonly contactModel: Model<ContactDocument>,
  ) {}


  //CREATE RESIDENTS

  async create(createResidentDto: CreateResidentDto): Promise<Resident> {
    try {
      const {contact,...residentData} = createResidentDto; 

      const newResident = new this.residentModel({
        ...residentData,
        contact: contact
      });

      return await newResident.save();
    } catch (error) {
      throw new InternalServerErrorException('Error al crear residente.');
    }
  }

  //ALL RESIDENT
  async findAll(): Promise<Resident[]> {
    try {
      const resident = await this.residentModel.find().populate('contact').exec();

      if (!resident) {
        throw new NotFoundException('Algo salió mal.');
      }

      if (resident.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No hay residentes para mostrar.',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return resident;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener usuarios.');
    }
  }


  //ONE RESIDENT
  async findOne(id: string): Promise<Resident> {
    try {
      const resident = await this.residentModel.findById(id).populate('contact').exec();

      if (!resident) {
        throw new NotFoundException('Residente no encontrado.');
      }

      return resident;
    } catch (error) {
      throw new NotFoundException('Algo salió mal.');
    }
  }



  //Delete Resident

  async remove(id: string): Promise<Object> {
    try {
      const deleteResponse = await this.residentModel.findByIdAndDelete(id);

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


}
