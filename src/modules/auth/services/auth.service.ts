import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/modules/users/dto';
import { User, UserDocument } from 'src/modules/users/schemas/user.schemas';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<Object> {
    try {
      const { password, username } = loginDto;
      console.log(loginDto)
      const user_response = await this.userModel
        .findOne({ username })
        .populate('role')
        .select('username password img uuid name lastname role');

      if (!user_response)
        throw new BadRequestException(['Las credenciales son incorrectas']);

      if (!bcrypt.compareSync(password, user_response.password))
        throw new BadRequestException(['Las credenciales son incorrectas']);

      const { _id, name, img, lastname, role } = user_response;

      return {
        user: { _id, name, lastname, img, role },
        token: this.getJwtToken({ _id: user_response._id })
      };
    } catch (error) {
      throw new NotFoundException('Algo salió mal.');
    }
  }

  async checkAuthStatus(user: UserDocument) {
    return {
        ...user,
        token: this.getJwtToken({ _id: user._id })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
