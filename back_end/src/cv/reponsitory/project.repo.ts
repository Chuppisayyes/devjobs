import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectRepository {
  constructor(private prisma: PrismaService) {}

  async addDuAn(data) {
    const project = await this.prisma.dUAN.create({
      data: {
        tenDuAn: data.tenDuAn,
        idNguoiDung: data.idNguoiDung,
        congNghe: data.congNghe,
        moTa: data.moTa,
        link: data.link,
      },
    });
    return project;
  }

  async updateDuAn(id, data) {
    const project = await this.prisma.dUAN.update({
      where: {
        idDuAn: id,
      },
      data: {
        tenDuAn: data.tenDuAn,
        idNguoiDung: data.idNguoiDung,
        congNghe: data.congnghe,
        moTa: data.moTa,
        link: data.link,
      },
    });
    return project;
  }

  async getAllDuAn(id) {
    const project = await this.prisma.dUAN.findMany({
      where: {
        idNguoiDung: id,
      },
    });
    return project.map((project) => ({
      id: project.idDuAn,
      tenDuAn: project.tenDuAn,
      moTa: project.moTa,
      idNguoiDung: project.idNguoiDung,
      link: project.link || null,
      congNghe: project.congNghe, // Add tenLoaiKN from loaiKN relation
    }));
  }
  async deleteDuAn(id) {
    return await this.prisma.dUAN.delete({
      where: { idDuAn: id },
    });
  }
}
