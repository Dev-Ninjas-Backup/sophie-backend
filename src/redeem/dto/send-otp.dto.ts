import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
  @ApiProperty({ example: 'MEM123456', description: 'The ID of the membership to send OTP to' })
  @IsString()
  membershipId: string;
}
