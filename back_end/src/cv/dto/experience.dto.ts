import { IsEmpty, IsNumberString } from 'class-validator';

export class ExperienceDto {
  moTa?: string;

  @IsEmpty()
  thoiGianKetThuc: string;

  @IsEmpty()
  thoiGianBatDau: string;

  @IsEmpty()
  viTri: string;

  @IsEmpty()
  @IsNumberString()
  idNguoiDung: string;

  @IsEmpty()
  tenCongTy: string;
}
