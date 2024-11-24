import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from "@nestjs/common";

import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { RegisterDTO } from "./dtos/register.dto";
import { LoginDTO } from "./dtos/login.dto";
import { RolesGuard } from "./roles/roles.guard";
import { UserRole } from "./roles/user-role.enum";
import { Roles } from "./roles/roles.decorator";
import { UsersService } from "./users/users.service";

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post("auth/login")
  async login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post("auth/logout")
  async logout(@Request() _request) {
    return new Response("WIP"); //TODO: blacklist old token
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Request() request) {
    return this.userService.findOne(request.user.email);
  }

  @Post("register")
  async register(
    @Body()
    registerDto: RegisterDTO,
  ) {
    return this.authService.register(registerDto);
  }

  @Get("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async onlyAdmin(@Request() request) {
    return request.user;
  }
}
