import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'priya@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Use-a-strong-password-123' })
  @IsString()
  @MinLength(1)
  @MaxLength(72)
  password!: string;
}
