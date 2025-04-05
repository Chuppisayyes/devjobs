import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CandidateRepository {
  constructor(private prisma: PrismaService) {}
  async updateProfileCandidate(id, data) {
    const updateCandidate = await this.prisma.nGUOIDUNG.update({
      where: {
        idNguoiDung: id,
      },
      data: {
        email: data.email,
        ten: data.ten,
        sdt: data.sdt,
        ngaySinh: data.ngaySinh,
        anhDaiDien: data.anhDaiDien,
        luongBatDau: data.luongBatDau,
        luongKetThuc: data.luongKetThuc,
        idViTri: data.idViTri,
        idCapDo: data.idCapDo,
        idTinhThanh: data.idTinhThanh,
        TrinhDo: data.trinhDo,
        kinhnghiem: data.kinhnghiem,
      },
    });
    return updateCandidate;
  }

  async changePassword(data) {
    const newPasswork = await this.prisma.nGUOIDUNG.update({
      where: {
        idNguoiDung: data.id,
      },
      data: {
        matKhau: data.matKhauMoi,
      },
    });
    return newPasswork;
  }
  async getMauKhau(id: number) {
    const candidate = await this.prisma.nGUOIDUNG.findUnique({
      where: { idNguoiDung: id },
    });
    if (!candidate) {
      throw new Error('candidate not found');
    }

    return candidate.matKhau;
  }
  async getCandidateDetail(id: number) {
    const candidate = await this.prisma.nGUOIDUNG.findUnique({
      where: { idNguoiDung: id },
      include: {
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
        tinhThanh: {
          select: {
            tenTinhThanh: true,
            viDo: true,
            kinhDo: true,
          },
        },
      },
    });
    if (!candidate) {
      throw new Error('Candidate not found');
    }

    return {
      idNguoiDung: candidate.idNguoiDung,
      ten: candidate.ten,
      sdt: candidate.sdt,
      email: candidate.email,
      ngaySinh: candidate.ngaySinh.toISOString().split('T')[0],
      anhDaiDien:
        candidate.anhDaiDien ??
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwkVfEKEdjFIryQmVhdVlLIwBGfGBzAA3GA&s',
      luongBatDau: candidate.luongBatDau ? candidate.luongBatDau : 'Thỏa thuận',
      luongKetThuc: candidate.luongKetThuc
        ? candidate.luongKetThuc
        : 'Thỏa thuận',
      idViTri: candidate.idViTri,
      tenVitri: candidate.viTri.tenViTri,
      tenCapDo: candidate.capDo.tenCapDo,
      diaChi: candidate.diaChi,
      idCapDo: candidate.idCapDo,
      idTinhThanh: candidate.idTinhThanh,
      tenTinhThanh: candidate.tinhThanh.tenTinhThanh,
      mucDo: candidate.capDo.mucDo,
      viDo: candidate.tinhThanh.viDo,
      kinhDo: candidate.tinhThanh.kinhDo,
      kinhnghiem: candidate.kinhnghiem,
      trinhDo: candidate.TrinhDo,
    };
  }

  async applyJob(idND, idBD) {
    const apply = await this.prisma.dANHSACH_UV.create({
      data: {
        idBaiDang: idBD,
        idNguoiDung: idND,
        thoiGianNop: new Date(),
      },
    });
    return apply;
  }

  async checkApply(idND, idBD) {
    const apply = await this.prisma.dANHSACH_UV.findMany({
      where: {
        idBaiDang: idBD,
        idNguoiDung: idND,
      },
    });
    return apply.length != 0;
  }
  async getSchedule(idBD: number, idND: number) {
    const data = await this.prisma.dANHSACH_UV.findUnique({
      where: {
        idBaiDang_idNguoiDung: {
          idBaiDang: idBD,
          idNguoiDung: idND,
        },
      },
    });

    return data;
  }
}
