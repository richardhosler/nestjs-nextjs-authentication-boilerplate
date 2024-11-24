import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./user.entity";
import { RegisterDTO } from "../dtos/register.dto";
import { UserRole } from "src/roles/user-role.enum";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create({
    email,
    password,
    firstName,
    lastName,
  }: RegisterDTO): Promise<User> {
    if (await this.findOne(email)) {
      throw new Error(
        "We can't register you at the moment, please try again in a moment",
      );
    }
    const user = new User();
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    user.role = UserRole.USER;
    user.createdAt = new Date();
    user.updatedAt = user.createdAt;
    user.isActive = true;
    return this.usersRepository.save(user);
  }
}
