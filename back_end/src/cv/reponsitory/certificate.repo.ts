import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CertificateRepository {
  constructor(private prisma: PrismaService) {}

  async addChungChi(data) {
    const cerificate = await this.prisma.cHUNGCHI.create({
      data: {
        tenChungChi: data.tenChungChi,
        idNguoiDung: data.idNguoiDung,
        donViCap: data.donViCap,
        link: data.link,
        ketQua: data.ketQua,
      },
    });
    return cerificate;
  }

  async updateChungChi(id, data) {
    const cerificate = await this.prisma.cHUNGCHI.update({
      where: {
        idChungChi: id,
      },

      data: {
        tenChungChi: data.tenChungChi,
        idNguoiDung: data.idNguoiDung,
        donViCap: data.donViCap,
        link: data.link,
        ketQua: data.ketQua,
      },
    });
    return cerificate;
  }

  async getAllChungChi(id) {
    const cerificate = await this.prisma.cHUNGCHI.findMany({
      where: {
        idNguoiDung: id,
      },
    });
    return cerificate.map((cerificate) => ({
      id: cerificate.idChungChi,
      idNguoiDung: cerificate.idNguoiDung,
      tenChungChi: cerificate.tenChungChi,
      donViCap: cerificate.donViCap,
      link: cerificate.link,
      ketQua: cerificate.ketQua,
    }));
  }

  async deleteChungChi(id) {
    return await this.prisma.cHUNGCHI.delete({
      where: { idChungChi: id },
    });
  }
}
