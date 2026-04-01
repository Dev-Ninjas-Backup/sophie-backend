// category/dto/create-category.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Restaurants', description: 'The name of the category' })
  @IsString()
  name: string;
}
