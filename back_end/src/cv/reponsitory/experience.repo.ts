import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ExperienceRepository {
  constructor(private prisma: PrismaService) {}

  async addkinhNghiem(data) {
    const experience = await this.prisma.kINHNGHIEM.create({
      data: {
        tenCongTy: data.tenCongTy,
        idNguoiDung: data.idNguoiDung,
        viTri: data.viTri,
        thoiGianBatDau: data.thoiGianBatDau,
        thoiGianKetThuc: data.thoiGianKetThuc,
        moTa: data.moTa,
      },
    });
    return experience;
  }

  async updatekinhNghiem(id, data) {
    const experience = await this.prisma.kINHNGHIEM.update({
      where: {
        idKinhNghiem: id,
      },
      data: {
        tenCongTy: data.tenCongTy,
        idNguoiDung: data.idNguoiDung,
        viTri: data.viTri,
        thoiGianBatDau: data.thoiGianBatDau,
        thoiGianKetThuc: data.thoiGianKetThuc,
        moTa: data.moTa,
      },
    });
    return experience;
  }

  async getAllkinhNghiem(id) {
    const experience = await this.prisma.kINHNGHIEM.findMany({
      where: {
        idNguoiDung: id,
      },
    });
    return experience.map((experience) => ({
      id: experience.idKinhNghiem,
      idNguoiDung: experience.idNguoiDung,
      moTa: experience.moTa,
      tenCongTy: experience.tenCongTy,
      thoiGianBatDau: experience.thoiGianBatDau.toISOString().split('T')[0],
      thoiGianKetThuc: experience.thoiGianKetThuc.toISOString().split('T')[0],
      viTri: experience.viTri,
    }));
  }

  async deletekinhNghiem(id) {
    return await this.prisma.kINHNGHIEM.delete({
      where: { idKinhNghiem: id },
    });
  }
}
