import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RequestRepository {
  constructor(private prisma: PrismaService) {}

  async addRequestMany(idBaiDang, noiDung) {
    const data = noiDung.map((noiDung) => ({
      idBaiDang: idBaiDang,
      noiDung: noiDung,
    }));

    const yeuCau = await this.prisma.yeuCau.createMany({
      data: data,
    });

    return yeuCau;
  }
  async addRequest(idBaiDang, noiDung) {
    const yeuCau = await this.prisma.yeuCau.create({
      data: {
        idBaiDang: idBaiDang,
        noiDung: noiDung,
      },
    });
    return yeuCau;
  }

  async updateRequest(idYeucau, noiDung) {
    const yeuCau = await this.prisma.yeuCau.update({
      where: {
        idYeuCau: idYeucau,
      },
      data: {
        noiDung: noiDung,
      },
    });
    return yeuCau;
  }

  async removeRequest(idYeucau) {
    const yeuCau = await this.prisma.yeuCau.delete({
      where: {
        idYeuCau: idYeucau,
      },
    });
    return yeuCau;
  }

  async getAllRequest(idBD) {
    const yeuCau = await this.prisma.yeuCau.findMany({
      where: {
        idBaiDang: idBD,
      },
    });
    return yeuCau;
  }
}
