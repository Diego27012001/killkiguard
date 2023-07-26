import { Injectable, NotFoundException, HttpStatus, HttpException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Role, RoleDocument } from '../schemas/rol.schemas';
import { User, UserDocument } from '../schemas/user.schemas';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, role, ...userData } = createUserDto; 
      const frole = await this.roleModel.findById(role);

      if (!frole) {
        throw new NotFoundException('Rol no encontrado.');
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = new this.userModel({
        ...userData,
        role: frole,
        password: hashedPassword,
      });

      return await newUser.save();
    } catch (error) {
      throw new InternalServerErrorException('Error al crear usuario.');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().populate('role').exec();

      if (!users) {
        throw new NotFoundException('Algo salió mal.');
      }

      if (users.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No hay usuarios para mostrar.',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return users;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener usuarios.');
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).populate('role').exec();

      if (!user) {
        throw new NotFoundException('Usuario no encontrado.');
      }

      return user;
    } catch (error) {
      throw new NotFoundException('Algo salió mal.');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { password, role, ...userData } = updateUserDto;
      const frole = await this.roleModel.findById(role);

      if (!frole) {
        throw new NotFoundException('Rol no encontrado.');
      }

      let userUpdate: UserDocument;

      if (password) {
        if (password.length < 6) {
          throw new BadRequestException('La contraseña debe contener como mínimo 6 caracteres.');
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        userUpdate = await this.userModel.findByIdAndUpdate(
          userData._id,
          { ...userData, role: frole, password: hashedPassword },
          { new: true },
        );
      } else {
        userUpdate = await this.userModel.findByIdAndUpdate(
          userData._id,
          { ...userData, role: frole },
          { new: true },
        );
      }

      if (!userUpdate) {
        throw new NotFoundException('Usuario no encontrado.');
      }

      const populatedUser = await this.userModel.findById(id).populate('role').exec();

      return populatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Error al actualiar usuario.');
    }
  }

  async remove(id: string): Promise<Object> {
    try {
      const deleteResponse = await this.userModel.findByIdAndDelete(id);

      if (!deleteResponse) {
        throw new NotFoundException('Usuario no encontrado.');
      }

      return {
        status: HttpStatus.ACCEPTED,
        message: 'Usuario eliminado exitosamente.',
      };
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado.');
    }
  }

}
