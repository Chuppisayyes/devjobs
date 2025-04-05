import {
  IsEmail,
  IsEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateCandidateDto {
  @IsEmpty()
  @IsNumberString()
  readonly idTinhThanh: string;

  @IsEmpty()
  @IsNumberString()
  readonly idCapDo: string;

  @IsEmpty()
  @IsNumberString()
  readonly idViTri: string;

  @IsEmpty()
  @IsEmail()
  readonly email: string;

  @IsEmpty()
  readonly ten: string;

  readonly ngaySinh?: string;

  readonly anhDaiDien?: string;

  @IsPhoneNumber('VN')
  readonly sDT?: string;

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

  @IsNumber()
  @IsOptional()
  readonly kinhnghiem?: number;

  @IsString()
  @IsOptional()
  readonly trinhDo?: string;
}

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
