import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthAdminRepository {
  constructor(private prisma: PrismaService) {}

  async countUser() {
    return await this.prisma.nGUOIDUNG.count();
  }
  async countCompany() {
    return await this.prisma.cONGTY.count();
  }
  async countPost() {
    return await this.prisma.bAIDANG.count();
  }

  async updatePosition(id, data) {
    const position = await this.prisma.vITRIUNGTUYEN.update({
      where: { idViTri: id },
      data: {
        tenViTri: data.tenViTri,
        trangThai: data.trangThai,
      },
    });
    return position;
  }
  async updateProvince(id, data) {
    const Proveder = await this.prisma.tINHTHANH.update({
      where: { idTinhThanh: id },
      data: {
        tenTinhThanh: data.tenTinhThanh,
        trangThai: data.trangThai,
        viDo: data.viDo,
        kinhDo: data.kinhDo,
      },
    });
    return Proveder;
  }
  async updateLevel(id, data) {
    const level = await this.prisma.capDo.update({
      where: { idCapDo: id },
      data: {
        tenCapDo: data.tenCapDo,
        trangThai: data.trangThai,
        mucDo: data.mucDo,
      },
    });
    return level;
  }

  async addPosition(data) {
    const existingPosition = await this.prisma.vITRIUNGTUYEN.findMany({
      where: { tenViTri: data.ten },
    });

    if (existingPosition.length > 0) {
      throw new Error(`Position with name "${data.ten}" already exists.`);
    }

    const addpost = await this.prisma.vITRIUNGTUYEN.create({
      data: {
        tenViTri: data.ten,
      },
    });
    return addpost;
  }

  async addProvince(data) {
    // Kiểm tra trùng tên
    const existingProvince = await this.prisma.tINHTHANH.findMany({
      where: { tenTinhThanh: data.ten },
    });
    if (existingProvince.length > 0) {
      throw new Error(`Province with name "${data.ten}" already exists.`);
    }

    // Thêm mới nếu không trùng
    const addProvince = await this.prisma.tINHTHANH.create({
      data: {
        tenTinhThanh: data.ten,
        viDo: data.viDo,
        kinhDo: data.kinhDo,
      },
    });
    return addProvince;
  }

  async addLevel(data) {
    // Kiểm tra trùng tên
    const existingLevel = await this.prisma.capDo.findMany({
      where: { tenCapDo: data.ten },
    });

    if (existingLevel.length > 0) {
      throw new Error(`Level with name "${data.ten}" already exists.`);
    }

    // Thêm mới nếu không trùng
    const addLevel = await this.prisma.capDo.create({
      data: {
        tenCapDo: data.ten,
        mucDo: data.mucDo,
      },
    });
    return addLevel;
  }

  async getAllCity() {
    const allCity = await this.prisma.tINHTHANH.findMany();
    return allCity;
  }

  async getAllPosition() {
    const allPoosition = await this.prisma.vITRIUNGTUYEN.findMany();
    return allPoosition;
  }

  async getAllLevel() {
    const allPoosition = await this.prisma.capDo.findMany();
    return allPoosition;
  }
  async getAllCompany() {
    return await this.prisma.cONGTY.findMany();
  }
  async getAllPost() {
    const rawData = await this.prisma.bAIDANG.findMany({
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
        viTri: {
          select: {
            tenViTri: true,
          },
        },
        capDo: {
          select: {
            tenCapDo: true,
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

  async getPostMany() {
    const rawData = await this.prisma.bAIDANG.findMany({
      take: 4, // Lấy 5 bài đăng mới nhất
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
        viTri: {
          select: {
            tenViTri: true,
          },
        },
        capDo: {
          select: {
            tenCapDo: true,
          },
        },
      },
      orderBy: {
        ngayDang: 'desc', // Sắp xếp theo ngày đăng giảm dần
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

  async getAllCandidate() {
    const rawData = await this.prisma.nGUOIDUNG.findMany({
      include: {
        viTri: {
          select: {
            tenViTri: true,
          },
        },
        tinhThanh: {
          select: {
            tenTinhThanh: true,
          },
        },
        capDo: {
          select: {
            tenCapDo: true,
          },
        },
      },
    });

    // Chuyển đổi dữ liệu
    return rawData.map((nguoiDung) => ({
      idNguoiDung: nguoiDung.idNguoiDung,
      ten: nguoiDung.ten,
      tenViTri: nguoiDung.viTri.tenViTri,
      tenCapDo: nguoiDung.capDo.tenCapDo,
      tenTinhThanh: nguoiDung.tinhThanh.tenTinhThanh,
      ngaySinh: nguoiDung.ngaySinh.toISOString().split('T')[0], // Định dạng ngày
      sdt: nguoiDung.sdt,
      diaChi: nguoiDung.diaChi,
      email: nguoiDung.email,
      trangThai: nguoiDung.trangThai,
      anhDaiDien: nguoiDung.anhDaiDien || 'https://via.placeholder.com/40', // Giá trị mặc định nếu null
    }));
  }
}
