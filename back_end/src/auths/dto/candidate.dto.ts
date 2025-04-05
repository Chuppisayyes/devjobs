import {
  IsInt,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsNumber,
  Min,
  Max,
  IsDateString,
  Length,
} from 'class-validator';

export class CandidateRegisterDto {
  @IsInt()
  idLoaiTK: number;

  @IsInt()
  idViTri: number;

  @IsInt()
  idTinhThanh: number;

  @IsInt()
  idCapDo: number;

  @IsString()
  @IsNotEmpty()
  ten: string;

  @IsDateString()
  ngaySinh: string;

  @IsString()
  @IsNotEmpty()
  sdt: string;

  @IsString()
  @IsOptional()
  diaChi?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  matKhau: string;

  @IsNumber()
  @Min(0)
  @Max(10000000000)
  @IsOptional()
  luongBatDau?: number;

  @IsNumber()
  @Min(0)
  @Max(1000000000000)
  @IsOptional()
  luongKetThuc?: number;

  @IsBoolean()
  @IsOptional()
  xacThuc?: boolean;

  @IsString()
  @IsOptional()
  anhDaiDien?: string;

  @IsNumber()
  @IsOptional()
  kinhnghiem?: number;

  @IsString()
  @IsOptional()
  TrinhDo?: string;
}

export class CandidateLoginDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  @Length(8, 100) // Mật khẩu nên dài ít nhất 8 ký tự
  readonly matKhau: string;
}
