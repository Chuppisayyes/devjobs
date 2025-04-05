import {
  IsString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  Length,
  Min,
  IsNumberString,
} from 'class-validator';

export class CompanyRegisterDto {
  @IsString()
  @Length(3, 100)
  readonly tenCongTy: string;

  @IsString()
  @Length(10, 200)
  readonly diaChi?: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber('VN') // Check phone number format for Vietnam
  readonly sDT?: string;

  @IsOptional()
  @IsUrl()
  readonly linkWeb?: string;

  @IsOptional()
  @IsString()
  readonly nganhNghe?: string;

  @IsOptional()
  @IsNumberString()
  @Min(1)
  readonly soLuongNhanVien?: string;

  @IsOptional()
  @IsUrl()
  readonly logo?: string;

  readonly ngayThanhLap?: string;

  @IsOptional()
  @IsString()
  readonly moTa?: string;

  @IsString()
  @Length(8, 100) // Mật khẩu nên dài ít nhất 8 ký tự
  readonly matKhau: string;
}

export class ComanyLoginDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  @Length(8, 100) // Mật khẩu nên dài ít nhất 8 ký tự
  readonly matKhau: string;
}
