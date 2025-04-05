import { IsEmpty } from 'class-validator';

export class UpdateDto {
  @IsEmpty()
  idUpdate: string;

  @IsEmpty()
  trangThai: string;
}
