import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotifycationRepository {
  constructor(private prisma: PrismaService) {}
  async getThongBaoList(id: number) {
    const thongBaos = await this.prisma.tHONGBAO.findMany({
      where: {
        idNguoiDung: id,
      },
      select: {
        idThongBao: true,
        idBaiDang: true,
        idNguoiDung: true,
        noiDung: true,
        thoiGianTB: true,
        trangThai: true,
        baiDang: {
          select: {
            hinhAnh: true,
          },
        },
      },
    });

    // Định dạng dữ liệu trả về
    return thongBaos.map((thongBao) => ({
      idThongBao: thongBao.idThongBao,
      idBaiDang: thongBao.idBaiDang,
      hinhAnh: thongBao.baiDang?.hinhAnh || 'default_image_url.jpg',
      idNguoiDung: thongBao.idNguoiDung,
      noidung: thongBao.noiDung,
      thoiGian: thongBao.thoiGianTB
        .toISOString()
        .replace('T', ' ')
        .substring(0, 16),
      trangThai: thongBao.trangThai,
    }));
  }

  async addNotifycation(idCT, idBD, noidung) {
    const thongBao = await this.prisma.tHONGBAO.create({
      data: {
        idCongTy: idCT,
        trangThai: 0,
        noiDung: noidung,
        thoiGianTB: new Date(),
        idBaiDang: idBD,
      },
    });
    return thongBao;
  }

  async updateNotification(id: number) {
    const update = await this.prisma.tHONGBAO.update({
      where: { idThongBao: id },
      data: {
        trangThai: 1,
      },
    });
    return update;
  }
}
