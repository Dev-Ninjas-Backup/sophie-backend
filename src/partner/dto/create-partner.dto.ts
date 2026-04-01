// partner/dto/create-partner.dto.ts
// import { IsString, IsInt, Min } from 'class-validator';

// export class CreatePartnerDto {
//   @IsString()
//   name: string;

//   @IsString()
//   discount: string;

//   @IsString()
//   categoryId: string;

//   @IsInt()
//   @Min(0)
//   maxRedeems: number;
// }

// partner/dto/create-partner.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerDto {
  @ApiProperty({ example: 'Coffee House', description: 'The name of the partner business' })
  @IsString()
  name: string;

  @ApiProperty({ example: '15% Off', description: 'The discount offered by the partner' })
  @IsString()
  discount: string;

  @ApiProperty({ example: 'clq123abc0001xyz', description: 'The ID of the category this partner belongs to' })
  @IsString()
  categoryId: string;
}
