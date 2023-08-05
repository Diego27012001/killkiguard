import { Controller, Get, Post, Body, Patch, Param, Delete,UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../schemas/user.schemas';
import { fileFilter } from 'src/modules/files/helpers';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  //@Auth(ValidRoles.Administrador)
  @UseInterceptors(FileInterceptor('profileImage', {
      fileFilter: fileFilter,
  }))
  createUser(@Body() createUser: CreateUserDto, @UploadedFile() profileImage): Promise<User> {
      return this.usersService.createUser(createUser, profileImage);
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
