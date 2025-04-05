import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private prisma: PrismaService) {}
  async checkAdmin(email: string) {
    const check = await this.prisma.admin.findMany({
      where: { email },
      include: {
        loaiTaiKhoan: true,
      },
    });
    return check.length === 0;
  }
  async updateProfileAdmin(data) {
    const updateAdmin = await this.prisma.admin.update({
      where: {
        id: data.id,
      },
      data: {
        email: data.email,
        ten: data.ten,
        sDT: data.sDT,
        ngaySinh: data.ngaySinh,
        anhDaiDien: data.anhDaiDien,
      },
    });
    return updateAdmin;
  }

  async addAdmin(data) {
    const updateAdmin = await this.prisma.admin.create({
      data: {
        idLoaiTK: 1,
        matKhau: data.matKhau,
        email: data.email,
        ten: data.ten,
        sDT: data.sDT,
        ngaySinh: data.ngaySinh,
        anhDaiDien: data.anhDaiDien,
      },
    });
    return updateAdmin;
  }

  async changePassword(data) {
    const newPasswork = await this.prisma.admin.update({
      where: {
        id: data.id,
      },
      data: {
        matKhau: data.matKhauMoi,
      },
    });
    return newPasswork;
  }

  async getAdminDetail(id: number) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });
    if (!admin) {
      throw new Error('Admin not found');
    }

    return {
      id: admin.id,
      ten: admin.ten,
      sDT: admin.sDT,
      email: admin.email,
      ngaySinh: admin.ngaySinh.toISOString().split('T')[0],
      anhDaiDien:
        admin.anhDaiDien ??
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwkVfEKEdjFIryQmVhdVlLIwBGfGBzAA3GA&s',
    };
  }

  async getMauKhau(id: number) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });
    if (!admin) {
      throw new Error('Admin not found');
    }

    return admin.matKhau;
  }
}
