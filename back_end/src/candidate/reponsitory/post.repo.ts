import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  async getJobPostInfo(idBD) {
    const baiDang = await this.prisma.bAIDANG.findUnique({
      where: {
        idBaiDang: idBD,
      },
      include: {
        congTy: {
          select: {
            tenCongTy: true,
            logo: true,
            nganhNghe: true,
            linkWeb: true,
            email: true,
            sDT: true,
          },
        },
      },
    });
    return {
      idCongTy: baiDang.idCongTy,
      idBaiDang: baiDang.idBaiDang,
      email: baiDang.congTy.email,
      tenBaiDang: baiDang.tenBaiDang,
    };
  }

  async getAllPost() {
    const today = new Date();

    const rawData = await this.prisma.bAIDANG.findMany({
      where: {
        trangThai: 'Đã Duyệt',
        hanChot: {
          gte: today,
        },
      },
      include: {
        congTy: {
          select: {
            tenCongTy: true,
            logo: true,
            nganhNghe: true,
            linkWeb: true,
            email: true,
            sDT: true,
          },
        },
        tinhThanh: {
          select: {
            tenTinhThanh: true,
            viDo: true,
            kinhDo: true,
          },
        },
        yeuCau: {
          select: {
            idYeuCau: true,
            noiDung: true,
          },
        },
        viTri: {
          select: {
            tenViTri: true,
          },
        },
        capDo: {
          select: {
            tenCapDo: true,
            mucDo: true,
          },
        },
      },
      orderBy: {
        ngayDang: 'desc',
      },
    });

    return rawData.map((baiDang) => ({
      idBaiDang: baiDang.idBaiDang,
      email: baiDang.congTy.email,
      sdt: baiDang.congTy.sDT,
      logo: baiDang.congTy.logo || 'https://via.placeholder.com/40',
      tenCongTy: baiDang.congTy.tenCongTy,
      nganhNghe: baiDang.congTy.nganhNghe,
      linkWeb: baiDang.congTy.linkWeb,
      tenBaiDang: baiDang.tenBaiDang,
      viTri: baiDang.idViTri,
      tenViTri: baiDang.viTri.tenViTri,
      tenCapDo: baiDang.capDo.tenCapDo,
      mucDo: baiDang.capDo.mucDo,
      viDo: baiDang.tinhThanh.viDo,
      kinhDo: baiDang.tinhThanh.kinhDo,
      soLuong: baiDang.soLuong,
      trangThai: baiDang.trangThai,
      hinhAnh: baiDang.hinhAnh || 'https://via.placeholder.com/100',
      luongBatDau: baiDang.luongBatDau,
      luongKetThuc: baiDang.luongKetThuc,
      trinhDo: baiDang.TrinhDo,
      kinhnghiem: baiDang.kinhnghiem,
      hanChot: baiDang.hanChot.toISOString().split('T')[0],
      ngayDang: baiDang.ngayDang.toISOString().split('T')[0],
      ngaySua: baiDang.ngaySua.toISOString().split('T')[0],
      diaChiCuThe: baiDang.diaChiCuThe,
      tenTinhThanh: baiDang.tinhThanh.tenTinhThanh,
      moTa: baiDang.moTa || 'Không có mô tả',
      yeuCau: baiDang.yeuCau.map((yeuCau) => ({
        idYeuCau: yeuCau.idYeuCau,
        noiDung: yeuCau.noiDung,
      })),
    }));
  }
}
