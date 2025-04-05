import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CompanyAdminRepository {
  constructor(private prisma: PrismaService) {}

  async updateCompany(data) {
    const newCompany = await this.prisma.cONGTY.update({
      where: { idCongTy: data.id },
      data: {
        trangThai: data.trangThai,
      },
    });
    return newCompany;
  }
}
