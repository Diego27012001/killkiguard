import { Injectable, NotFoundException, HttpStatus, HttpException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResidentDto } from '../dto/create-resident.dto';
import { UpdateResidentDto } from '../dto/update-resident.dto';
import { Contact, ContactDocument } from '../schemas/contact.entity';
import { Resident, ResidentDocument } from '../schemas/resident.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResidentService {
  constructor(
    @InjectModel(Resident.name) private readonly residentModel: Model<ResidentDocument>,
    @InjectModel(Contact.name) private readonly contactModel: Model<ContactDocument>,
  ) { }

  //CREATE RESIDENT

  async create(createResidentDto: CreateResidentDto): Promise<Resident> {

    try {
      // Copiar todos los datos de createResidentDto a una nueva variable
      const newResidentData = { ...createResidentDto };

      // Guardar los contactos en la colección "contacto"
      const savedContacts = await Promise.all(
        createResidentDto.contact.map((contact) => new this.contactModel(contact).save())
      );

      // Establecer los IDs de los contactos relacionados en el nuevo residente
      newResidentData.contact = savedContacts.map((contact) => contact._id);

      // Crear el residente con todos los datos, incluyendo "contact"
      const newResident = new this.residentModel(newResidentData);

      return await newResident.save();
    } catch (error) {
      throw new InternalServerErrorException('Error al crear residente.', error.message);
    }
  }

  //ALL RESIDENT
  async findAll(): Promise<Resident[]> {

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
