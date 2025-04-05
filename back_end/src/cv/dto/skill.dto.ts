import { IsEmpty, IsNumberString } from 'class-validator';

export class SkillDto {
  @IsEmpty()
  @IsNumberString()
  idLoaiKN: string;

  noiDung?: string;

  @IsEmpty()
  @IsNumberString()
  idNguoiDung: string;
}
