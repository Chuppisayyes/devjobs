import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostJobRepository {
  constructor(private prisma: PrismaService) {}

  async addPostJob(id, data: any) {
    const baiDang = await this.prisma.bAIDANG.create({
      data: {
        idCongTy: id,
        tenBaiDang: data.tenBaiDang,
        soLuong: data.soLuong,
        idTinhThanh: data.idTinhThanh,
        idViTri: data.idViTri,
        idCapDo: data.idCapDo,
        hanChot: data.hanChot,
        hinhAnh: data.hinhAnh,
        diaChiCuThe: data.diaChiCuThe,
        luongBatDau: data.luongBatDau,
        luongKetThuc: data.luongKetThuc,
        ngayDang: new Date(),
        ngaySua: new Date(),
        moTa: data.moTa,
        TrinhDo: data.TrinhDo,
        kinhnghiem: data.kinhnghiem,
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
    });

    return {
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
    };
  }

  async updatePostJob(idBD, idCT, data: any) {
    const job = await this.prisma.bAIDANG.update({
      where: {
        idBaiDang: idBD,
        idCongTy: idCT,
      },
      data: {
        tenBaiDang: data.tenBaiDang,
        soLuong: data.soLuong,
        idTinhThanh: data.idTinhThanh,
        idViTri: data.idViTri,
        idCapDo: data.idCapDo,
        hanChot: data.hanChot,
        hinhAnh: data.hinhAnh,
        diaChiCuThe: data.diaChiCuThe,
        luongBatDau: data.luongBatDau,
        luongKetThuc: data.luongKetThuc,
        ngaySua: new Date(),
        moTa: data.moTa,
        TrinhDo: data.TrinhDo,
        kinhnghiem: data.kinhnghiem,
      },
    });
    return job.idBaiDang;
  }

  async getAllPostByCompany(id) {
    const rawData = await this.prisma.bAIDANG.findMany({
      where: {
        idCongTy: id,
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
          },
        },
        yeuCau: {
          select: {
            idYeuCau: true,
            noiDung: true,
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
      soLuong: baiDang.soLuong,
      trangThai: baiDang.trangThai,
      hinhAnh: baiDang.hinhAnh || 'https://via.placeholder.com/100',
      luongBatDau: baiDang.luongBatDau
        ? baiDang.luongBatDau.toLocaleString('vi-VN')
        : 'Thỏa thuận',
      luongKetThuc: baiDang.luongKetThuc
        ? baiDang.luongKetThuc.toLocaleString('vi-VN')
        : 'Thỏa thuận',
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

  async getPostByCompany(idBD) {
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
    });

    return {
      email: baiDang.congTy.email,
      tenCongTy: baiDang.congTy.tenCongTy,
      tenBaiDang: baiDang.tenBaiDang,
      viTri: baiDang.viTri.tenViTri,
      linkWeb: baiDang.congTy.linkWeb,
      tenCapDo: baiDang.capDo.tenCapDo,
      mucDo: baiDang.capDo.mucDo,
      viDo: baiDang.tinhThanh.viDo,
      kinhDo: baiDang.tinhThanh.kinhDo,
      luongBatDau: baiDang.luongBatDau,
      luongKetThuc: baiDang.luongKetThuc,
      trinhDo: baiDang.TrinhDo,
      kinhnghiem: baiDang.kinhnghiem,
    };
  }
}
