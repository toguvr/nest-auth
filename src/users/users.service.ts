import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IHashProvider } from '@/core/providers/hash/interface/IHashProvider';
import { User } from './entities/user.entity';
import { IUserRepository } from './repositories/interface/IUserRepository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashProvider: IHashProvider,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (existUser) {
      throw new HttpException('Email já em uso!', HttpStatus.BAD_REQUEST);
    }

    const data = {
      ...createUserDto,
      password: await this.hashProvider.generateHash(createUserDto.password),
    };

    const createdUser = await this.userRepository.save(data);

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return { user };
  }
}
