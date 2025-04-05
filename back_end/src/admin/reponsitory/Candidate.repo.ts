import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CandidateAdminRepository {
  constructor(private prisma: PrismaService) {}
  async updateCandidate(data) {
    const newCandidate = await this.prisma.nGUOIDUNG.update({
      where: {
        idNguoiDung: data.id,
      },
      data: {
        trangThai: data.trangThai,
      },
    });
    return newCandidate;
  }
}
