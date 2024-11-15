import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { RegisterDTO } from "../dtos/register.dto";
import { UsersService } from "../users/users.service";
import { User } from "src/users/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ access_token: string; user: User }> {
    const message =
      "We can't log you in at the moment, please try again in a moment";

    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException(message);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(message);
    }

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
      user,
    };
  }

  async register({
    email,
    password,
    firstName,
    lastName,
  }: RegisterDTO): Promise<{ access_token: string; user: User }> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.usersService.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      return {
        access_token: this.jwtService.sign({
          email: user.email,
          sub: user.id,
        }),
        user: user,
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
