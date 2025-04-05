import {
  IsEmail,
  IsEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class UpdateAdminDto {
  @IsEmpty()
  @IsNumberString()
  readonly id: string;

  @IsEmpty()
  @IsEmail()
  readonly email: string;

  @IsEmpty()
  readonly ten: string;

  readonly ngaySinh?: string;

  readonly anhDaiDien?: string;

  @IsPhoneNumber('VN')
  readonly sDT?: string;
}

export class AddAdminDto {
  @IsEmpty()
  @IsEmail()
  readonly email: string;

  @IsEmpty()
  readonly ten: string;

  readonly ngaySinh?: Date;

  readonly anhDaiDien?: string;

  @IsPhoneNumber('VN')
  readonly sDT?: string;

  @IsString()
  @Length(8, 100)
  readonly matKhau: string;
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
