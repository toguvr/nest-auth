import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interface/IUserRepository';
import { PrismaService } from '@/core/database/prisma.service';
import { User } from '@/users/entities/user.entity';
import { CreateUserDto } from '@/users/dto/create-user.dto';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return data || null;
  }

  async save(data: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: { id },
    });

    return data;
  }
}
