import { IsEmpty, IsNumberString } from 'class-validator';

export class ProjectDto {
  @IsEmpty()
  tenDuAn: string;
  @IsEmpty()
  @IsNumberString()
  idNguoiDung: string;

  @IsEmpty()
  congNghe: string;

  moTa?: string;

  link?: string;
}
