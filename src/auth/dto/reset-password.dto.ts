import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'currentpassword123', description: 'The current password of the user' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'newpassword123', description: 'The new password to set (min 6 chars)' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
