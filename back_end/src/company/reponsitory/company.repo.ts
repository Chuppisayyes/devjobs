import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CompanyRepository {
  constructor(private prisma: PrismaService) {}

  async changePassword(data) {
    const newPasswork = await this.prisma.cONGTY.update({
      where: {
        idCongTy: data.id,
      },
      data: {
        matKhau: data.matKhauMoi,
      },
    });
    return newPasswork;
  }
  async getMauKhau(id: number) {
    const candidate = await this.prisma.cONGTY.findUnique({
      where: { idCongTy: id },
    });
    if (!candidate) {
      throw new Error('candidate not found');
    }

    return candidate.matKhau;
  }

  async getCompany(id) {
    const company = await this.prisma.cONGTY.findUnique({
      where: { idCongTy: id },
    });

    if (!company) {
      throw new Error('Company not found');
    }

    return {
      diaChi: company.diaChi,
      email: company.email,
      idCongTy: company.idCongTy,
      linkWeb: company.linkWeb,
      logo: company.logo,
      moTa: company.moTa,
      nganhNghe: company.nganhNghe,
      ngayThanhLap: company.ngayThanhLap.toISOString().split('T')[0],
      sDT: company.sDT,
      soLuongNhanVien: company.soLuongNhanVien,
      trangThai: company.trangThai,
      tenCongTy: company.tenCongTy,
    };
  }

  async updateCompany(id, data) {
    return await this.prisma.cONGTY.update({
      where: {
        idCongTy: id,
      },
      data: {
        diaChi: data.diaChi,
        email: data.email,
        linkWeb: data.linkWeb,
        logo: data.logo,
        moTa: data.moTa,
        nganhNghe: data.nganhNghe,
        ngayThanhLap: data.ngayThanhLap,
        sDT: data.sDT,
        soLuongNhanVien: data.soLuongNhanVien,
        tenCongTy: data.tenCongTy,
      },
    });
  }

  async lockAccount(id) {
    const lock = await this.prisma.cONGTY.update({
      where: { idCongTy: id },
      data: {
        trangThai: 'Đã Khóa',
      },
    });
    return lock;
  }
}
