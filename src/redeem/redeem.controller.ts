import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RedeemService } from './redeem.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { RedeemDto } from './dto/redeem-dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Redeems')
@Controller('redeem')
export class RedeemController {
  constructor(private readonly redeemService: RedeemService) {}

  @ApiOperation({ summary: 'Send OTP for redemption' })
  @Post('send-otp')
  sendOtp(@Body() dto: SendOtpDto) {
    return this.redeemService.sendOtp(dto.membershipId);
  }

  @ApiOperation({ summary: 'Redeem an offer using OTP' })
  @Post()
  redeem(@Body() dto: RedeemDto) {
    return this.redeemService.redeem(dto.membershipId, dto.otp, dto.partnerId);
  }

  @ApiOperation({ summary: 'Get all redemptions' })
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    const redeems = await this.redeemService.findAll(page, limit);
    return {
      success: true,
      ...redeems,
    };
  }
}
