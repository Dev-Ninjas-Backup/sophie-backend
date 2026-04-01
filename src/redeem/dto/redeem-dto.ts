import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RedeemDto {
  @ApiProperty({ example: 'MEM123456', description: 'The ID of the membership redeeming the offer' })
  @IsString()
  membershipId: string;

  @ApiProperty({ example: '849312', description: 'The OTP code received by the user' })
  @IsString()
  otp: string;

  @ApiProperty({ example: 'clk987xyz0002abc', description: 'The ID of the partner where the offer is being redeemed.' })
  @IsString()
  partnerId: string;
}
