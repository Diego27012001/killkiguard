import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/users/schemas/user.schemas';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { LoginDto } from 'src/modules/users/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<Object> {
      const { password, username } = loginDto;
      const user_response = await this.userModel
        .findOne({ username })
        .populate('role')
        .select('username password _id name lastname role');

      if (!user_response)
        throw new BadRequestException(['Las credenciales son incorrectas']);

      if (!bcrypt.compareSync(password, user_response.password))
        throw new BadRequestException(['Las credenciales son incorrectas']);

      const { _id, name, lastname, role } = user_response;

      return {
        user: { _id, name, lastname, role },
        token: this.getJwtToken({ _id: user_response._id })
      };
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
