import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CompanyRepository {
  constructor(private prisma: PrismaService) {}

  async registerCompany(data) {
    const company = await this.prisma.cONGTY.create({
      data: data,
    });
    return company;
  }

  async existingCompany(email) {
    const check = await this.prisma.cONGTY.findMany({
      where: {
        email,
      },
    });

    return check.length === 0;
  }

  async updateCompany(id: number, data: any) {
    return this.prisma.cONGTY.update({
      where: { idCongTy: id },
      data,
    });
  }
  async checkCompany(email: string) {
    return this.prisma.cONGTY.findFirst({
      where: { email },
      include: {
        loaiTaiKhoan: true,
      },
    });
  }

  async getCompany(id) {
    return this.prisma.cONGTY.findUnique({
      where: { idCongTy: id },
    });
  }

  async getJobCompany(id: number) {
    // Đợi kết quả từ Prisma
    const jobList = await this.prisma.bAIDANG.findMany({
      where: { idCongTy: id },
      include: {
        congTy: {
          select: {
            tenCongTy: true,
            logo: true,
            idCongTy: true,
          },
        },
        tinhThanh: {
          select: {
            tenTinhThanh: true,
          },
        },
      },
    });

    // Dùng .map để format dữ liệu
    return jobList.map((job) => ({
      idBaiDang: job.idBaiDang,
      tenBaiDang: job.tenBaiDang,
      idCongTy: job.congTy.idCongTy,
      tenCongTy: job.congTy.tenCongTy,
      logo:
        job.congTy.logo ??
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwkVfEKEdjFIryQmVhdVlLIwBGfGBzAA3GA&s',
      viTri: job.idViTri,
      hanChot: job.hanChot.toISOString().split('T')[0], // Format ngày
      tinhThanh: job.tinhThanh.tenTinhThanh,
      soLuong: job.soLuong,
    }));
  }
}
