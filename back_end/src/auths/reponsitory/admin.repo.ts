import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private prisma: PrismaService) {}
  async checkAdmin(email: string) {
    const admins = await this.prisma.admin.findFirst({
      where: { email },
    });
    const quyen = await this.prisma.lOAITAIKHOAN.findUnique({
      where: { idLoaiTK: admins.idLoaiTK },
    });
    const { ...rest } = admins;
    const { ...restloai } = quyen;
    const admin = {
      ...rest,
      ...restloai,
    };
    return admin;
  }
}
