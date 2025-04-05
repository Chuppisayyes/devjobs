import {
  IsDateString,
  IsEmail,
  IsEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class ChangePasswordDto {
  @IsEmpty()
  @IsNumberString()
  readonly id: string;

  @IsString()
  @Length(8, 100)
  readonly matKhau: string;

  @IsString()
  @Length(8, 100)
  readonly matKhauMoi: string;
}

export class UpdateCompanyDto {
  readonly diaChi?: string;
  @IsEmpty()
  @IsEmail()
  readonly email: string;

  readonly linkWeb?: string;

  readonly logo?: string;

  readonly moTa?: string;

  @IsEmpty()
  readonly nganhNghe: string;

  @IsDateString()
  ngayThanhLap: string;

  @IsNumberString()
  sDT: string;

  @IsNumberString()
  soLuongNhanVien?: string;

  @IsEmpty()
  tenCongTy: string;
}
