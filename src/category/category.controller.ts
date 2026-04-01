// category/category.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private service: CategoryService) {}


    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Create a new category' })
    @Post()
    create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Get a single category by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a category by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
