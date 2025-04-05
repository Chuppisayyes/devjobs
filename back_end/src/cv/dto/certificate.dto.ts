import { IsEmpty, IsNumberString } from 'class-validator';

export class CerificateDto {
  @IsEmpty()
  tenChungChi: string;

  @IsEmpty()
  @IsNumberString()
  idNguoiDung: string;

  donViCap?: string;

  link?: string;
  ketQua?: string;
}
