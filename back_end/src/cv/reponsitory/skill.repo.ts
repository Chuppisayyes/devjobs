import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SkillRepository {
  constructor(private prisma: PrismaService) {}

  async addSkill(data) {
    const kyNang = await this.prisma.kYNANG.create({
      data: {
        idLoaiKN: data.idLoaiKN,
        idNguoiDung: data.idNguoiDung,
        noiDung: data.noiDung,
      },
    });
    return kyNang;
  }

  async updateSkill(id, data) {
    const kyNang = await this.prisma.kYNANG.update({
      where: {
        idKyNang: id,
      },

      data: {
        idLoaiKN: data.idLoaiKN,
        idNguoiDung: data.idNguoiDung,
        noiDung: data.noiDung,
      },
    });
    return kyNang;
  }

  async getAllSkill(id: number) {
    const kyNang = await this.prisma.kYNANG.findMany({
      where: {
        idNguoiDung: id,
      },
      include: {
        loaiKN: {
          select: {
            tenKyNang: true,
          },
        },
      },
    });

    // Transform the response to include 'tenLoaiKN' at the top level
    return kyNang.map((skill) => ({
      id: skill.idKyNang,
      idLoaiKN: skill.idLoaiKN,
      moTa: skill.noiDung,
      idNguoiDung: skill.idNguoiDung,
      tenKyNang: skill.loaiKN?.tenKyNang || null, // Add tenLoaiKN from loaiKN relation
    }));
  }

  async deleteKyNang(id) {
    return await this.prisma.kYNANG.delete({
      where: { idKyNang: id },
    });
  }
}
