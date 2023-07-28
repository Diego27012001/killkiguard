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
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, role, profileImage, ...userData } = createUserDto;
    const frole = await this.roleModel.findById(role);

    if (!frole) {
      throw new NotFoundException('Rol no encontrado.');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    let profileImageBuffer: Buffer;
    if (profileImage) {
      profileImageBuffer = Buffer.from(profileImage.buffer); // Esto asume que el objeto File en el cliente contiene la propiedad 'buffer' con los datos del archivo en formato Buffer
    }

    const newUser = new this.userModel({
      ...userData,
      role: frole,
      password: hashedPassword,
      profileImage: profileImageBuffer, // Asigna el Buffer de la imagen al campo 'profileImage' en el documento del usuario
    });

    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
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
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate('role').exec();

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    const { _id, password, role, profileImage, ...userData } = updateUserDto;
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
        _id,
        { ...userData, role: frole, password: hashedPassword },
        { new: true },
      );
    } else {
      userUpdate = await this.userModel.findByIdAndUpdate(
        _id,
        { ...userData, role: frole },
        { new: true },
      );
    }

    if (!userUpdate) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    // Si se proporciona una nueva imagen, actualiza el campo 'profileImage' en el documento del usuario
    if (profileImage) {
      const profileImageBuffer = Buffer.from(profileImage.buffer); // Convierte la nueva imagen a un objeto Buffer
      userUpdate.profileImage = profileImageBuffer; // Actualiza el campo 'profileImage' con la nueva imagen
      await userUpdate.save(); // Guarda los cambios en la base de datos
    }

    // Realiza una búsqueda para obtener el usuario actualizado con el campo 'role' poblado
    const populatedUser = await this.userModel.findById(_id).populate('role').exec();

    return populatedUser;
  }

  async remove(id: string): Promise<Object> {
    const deleteResponse = await this.userModel.findByIdAndDelete(id);

    if (!deleteResponse) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    return {
      status: HttpStatus.ACCEPTED,
      message: 'Usuario eliminado exitosamente.',
    };
  }

}
