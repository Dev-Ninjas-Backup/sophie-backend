// partner/partner.controller.ts
import { Controller, Post, Get, Param, Body, Delete, UseGuards, Patch } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Partners')
@Controller('partners')
export class PartnerController {
  constructor(private service: PartnerService) { }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new partner' })
  @Post()
  async create(@Body() dto: CreatePartnerDto) {
    return this.service.create(dto);
  }


  @ApiOperation({ summary: 'Get all partners' })
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.delete(id);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<CreatePartnerDto>) {
    return this.service.update(id, dto);
  }
}
