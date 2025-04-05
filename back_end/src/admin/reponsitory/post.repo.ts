import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostAdminRepository {
  constructor(private prisma: PrismaService) {}

  async updatePost(data) {
    const newPost = await this.prisma.bAIDANG.update({
      where: {
        idBaiDang: data.id,
      },
      data: {
        trangThai: data.trangThai,
      },
    });
    return newPost;
  }
}
