// partner/dto/update-partner.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdatePartnerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  discount?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;
}
