import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EducationRepository {
  constructor(private prisma: PrismaService) {}

  async addHocVan(data) {
    console.log(data);
    const education = await this.prisma.hOCVAN.create({
      data: {
        noiHoc: data.noiHoc,
        idNguoiDung: data.idNguoiDung,
        diaChi: data.diaChi,
        diem: data.diem,
        nganhHoc: data.nganhHoc,
        thoiGianBatDau: data.thoiGianBatDau,
        thoiGianKetThuc: data.thoiGianKetThuc,
      },
    });
    return education;
  }

  async updateHocVan(id, data) {
    const education = await this.prisma.hOCVAN.update({
      where: {
        idHocVan: id,
      },

      data: {
        noiHoc: data.noiHoc,
        idNguoiDung: data.idNguoiDung,
        diaChi: data.diaChi,
        diem: data.diem,
        nganhHoc: data.nganhHoc,
        thoiGianBatDau: data.thoiGianBatDau,
        thoiGianKetThuc: data.thoiGianKetThuc,
      },
    });
    return education;
  }

  async getAllHocVan(id) {
    const education = await this.prisma.hOCVAN.findMany({
      where: {
        idNguoiDung: id,
      },
    });
    return education.map((education) => ({
      id: education.idHocVan,
      idNguoiDung: education.idNguoiDung,
      diaChi: education.diaChi,
      diem: education.diem,
      thoiGianBatDau: education.thoiGianBatDau.toISOString().split('T')[0],
      thoiGianKetThuc: education.thoiGianKetThuc.toISOString().split('T')[0],
      nganhHoc: education.nganhHoc,
      noiHoc: education.noiHoc,
    }));
  }
  async deleteHocVan(id) {
    return await this.prisma.hOCVAN.delete({
      where: { idHocVan: id },
    });
  }
}
