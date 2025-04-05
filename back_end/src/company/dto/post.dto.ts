import {
  IsEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PostJob {
  @IsEmpty()
  @IsNumberString()
  readonly idCapDo: string;

  @IsEmpty()
  @IsNumberString()
  readonly idTinhThanh: string;

  @IsEmpty()
  @IsNumberString()
  readonly idViTri: string;

  @IsNumber()
  @Min(0)
  @Max(10000000000)
  @IsNumberString()
  @IsOptional()
  readonly luongBatDau: string;

  @IsNumber()
  @Min(0)
  @Max(1000000000000)
  @IsNumberString()
  @IsOptional()
  readonly luongKetThuc?: string;

  @IsNumberString()
  readonly soLuong: string;

  readonly tenBaiDang: string;

  readonly diaChiCuThe: string;

  readonly hanChot: string;

  readonly hinhAnh: string;

  readonly moTa: string;

  @IsNumber()
  @IsOptional()
  readonly kinhnghiem?: number;

  @IsString()
  @IsOptional()
  readonly TrinhDo?: string;
}

export class YeuCauDto {
  readonly noiDung: string;
}
