import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CandidateRepository {
  constructor(private prisma: PrismaService) {}

  async registerCandidate(data) {
    const candidate = await this.prisma.nGUOIDUNG.create({
      data: data,
    });
    return candidate;
  }

  async existingCandidate(email) {
    const check = await this.prisma.nGUOIDUNG.findMany({
      where: {
        email,
      },
    });

    return check.length === 0;
  }

  async updateCandidate(id: number, data: any) {
    return await this.prisma.nGUOIDUNG.update({
      where: { idNguoiDung: id },
      data,
    });
  }
  async checkCandidate(email: string) {
    return await this.prisma.nGUOIDUNG.findMany({
      where: { email },
      include: {
        loaiTaiKhoan: true, // Include bảng LoaiTaiKhoan
      },
    });
  }
}
