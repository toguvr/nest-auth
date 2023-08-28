import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @ApiProperty({
    example: 'email@email.com',
    description: `O e-mail é necessário apra o login, mas não necessariamente precisa ser o mesmo e-mail da rede social que estiver conectada. Login sem rede social precisa de uma senha.`,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Paulo Salvatore',
    description: `O nome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir informações da pessoa conectada.`,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'senha fraca.',
  })
  password: string;

  @ApiProperty({
    example: 'Paulo Salvatore',
    description: `O nome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir informações da pessoa conectada.`,
  })
  @IsString()
  name: string;
}
