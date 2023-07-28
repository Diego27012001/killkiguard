import { Controller, Get, Post, UploadedFile, UseInterceptors, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../schemas/user.schemas';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  // @UseInterceptors(FileInterceptor('profileImage')) // 'profileImage' es el nombre del campo en el formulario donde se enviará la imagen
  // async create(@UploadedFile() profileImage: Express.Multer.File, @Body() createUserDto: CreateUserDto): Promise<User> {
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    // Validar el archivo de imagen (opcional)
    // if (profileImage && !this.usersService.isValidImageFile(profileImage)) {
    //   throw new BadRequestException('El archivo de imagen no es válido.');
    // }
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id); // Implementa el método findOne en el servicio.
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(updateUserDto); // Implementa el método update en el servicio.
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Object> {
    return this.usersService.remove(id); // Implementa el método remove en el servicio.
  }
}
