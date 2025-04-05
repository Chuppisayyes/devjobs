import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CandidateRepository {
  constructor(private prisma: PrismaService) {}

  async getAllCandidate(idBD: number) {
    const listUngVien = await this.prisma.dANHSACH_UV.findMany({
      where: {
        idBaiDang: idBD,
      },
      include: {
        nguoiDung: {
          select: {
            idNguoiDung: true,
            ten: true,
            anhDaiDien: true,
            TrinhDo: true,
            kinhnghiem: true,
            luongBatDau: true,
            luongKetThuc: true,
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
        },
      },
    });

    const formattedList = listUngVien.map((candidate) => ({
      idNguoiDung: candidate.nguoiDung.idNguoiDung,
      tenNguoiDung: candidate.nguoiDung.ten,
      logo:
        candidate.nguoiDung.anhDaiDien ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwkVfEKEdjFIryQmVhdVlLIwBGfGBzAA3GA&s',
      trangThai: candidate.trangThai,
      mucDo: candidate.nguoiDung.capDo.mucDo,
      viDo: candidate.nguoiDung.tinhThanh.viDo,
      kinhDo: candidate.nguoiDung.tinhThanh.kinhDo,
      kinhnghiem: candidate.nguoiDung.kinhnghiem,
      trinhDo: candidate.nguoiDung.TrinhDo,
      tenViTri: candidate.nguoiDung.viTri.tenViTri,
      luongBatDau: candidate.nguoiDung.luongBatDau,
      luongKetThuc: candidate.nguoiDung.luongKetThuc,
    }));

    return formattedList;
  }

  async updateStatus(idBD: number, idND: number, noidung) {
    const update = await this.prisma.dANHSACH_UV.update({
      where: {
        idBaiDang_idNguoiDung: {
          idBaiDang: idBD,
          idNguoiDung: idND,
        },
      },
      data: {
        trangThai: noidung.newStatus,
        thoiBatDau: noidung.startTime,
        kieuPhongVan: noidung.interviewType,
        diaChi: noidung.interviewAddress,
        link: noidung.interviewLink,
      },
    });

    return update;
  }
  async updateNote(idBD: number, idND: number, noidung) {
    const update = await this.prisma.dANHSACH_UV.update({
      where: {
        idBaiDang_idNguoiDung: {
          idBaiDang: idBD,
          idNguoiDung: idND,
        },
      },
      data: {
        trangThai: noidung,
      },
    });

    return update;
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
  async getCandidateDetail(id: number) {
    const candidate = await this.prisma.nGUOIDUNG.findUnique({
      where: { idNguoiDung: id },
      include: {
        viTri: {
          select: {
            tenViTri: true,
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
      diaChi: candidate.diaChi,
      ngaySinh: candidate.ngaySinh.toISOString().split('T')[0],
      anhDaiDien:
        candidate.anhDaiDien ??
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwkVfEKEdjFIryQmVhdVlLIwBGfGBzAA3GA&s',
      luongBatDau: candidate.luongBatDau ? candidate.luongBatDau : 'Thỏa thuận',
      luongKetThuc: candidate.luongKetThuc
        ? candidate.luongKetThuc
        : 'Thỏa thuận',
      tenViTri: candidate.viTri.tenViTri,
      idCapDo: candidate.idCapDo,
      idTinhThanh: candidate.idTinhThanh,
    };
  }
}
