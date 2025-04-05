import { IsEmpty, IsNumberString } from 'class-validator';

export class EducationDto {
  @IsEmpty()
  noiHoc: string;

  @IsEmpty()
  @IsNumberString()
  readonly idNguoiDung: string;

  readonly diaChi?: string;

  readonly diem?: string;

  @IsEmpty()
  readonly nganhHoc: string;

  @IsEmpty()
  readonly thoiGianBatDau: string;

  @IsEmpty()
  readonly thoiGianKetThuc: string;
}
