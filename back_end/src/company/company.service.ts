import { BadRequestException, Injectable } from '@nestjs/common';
import { ChangePasswordDto, UpdateCompanyDto } from './dto/company.dto';
import { CompanyRepository } from './reponsitory/company.repo';
import * as bcrypt from 'bcrypt';
import { PostJob } from './dto/post.dto';
import { PostJobRepository } from './reponsitory/postJob.repo';
import { RequestRepository } from './reponsitory/request.repo';
import { NotifycationRepository } from './reponsitory/notification.repo';
import { CandidateRepository } from './reponsitory/Candidate.repo';
import { EmailServiceCandidate } from 'src/config/sendEmailCadidate';
import { SimilarityReponsitory } from '../Similarity/Similarity.repo';
import { PostsGateway } from './reponsitory/posts.gateway';

@Injectable()
export class CompanyService {
  constructor(
    private readonly repoCompany: CompanyRepository,
    private readonly repoPostJob: PostJobRepository,
    private readonly repoRequest: RequestRepository,
    private readonly repoNotifycation: NotifycationRepository,
    private readonly repoCandidate: CandidateRepository,
    private readonly repoEmailCandidate: EmailServiceCandidate,
    private readonly postsGateway: PostsGateway,
    private readonly repoSimilarity: SimilarityReponsitory,
  ) {}

  async getCompanyDetail(id) {
    try {
      id = parseInt(id);
      const company = await this.repoCompany.getCompany(id);
      if (!company) {
        throw new BadRequestException('Công ty không tồn tại');
      }
      return {
        message: 'Dữ liệu công ty lấy thành công',
        status: 200,
        data: company,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateCompany(id, dto: UpdateCompanyDto) {
    try {
      const { ngayThanhLap, soLuongNhanVien, ...rest } = dto;
      const data = {
        ngayThanhLap: new Date(ngayThanhLap),
        ...rest,
        soLuongNhanVien: parseInt(soLuongNhanVien),
      };
      const idCompany = parseInt(id);
      const update = await this.repoCompany.updateCompany(idCompany, data);

      if (!update) {
        throw new BadRequestException('Cập nhật thông tin không Thành công');
      }
      return {
        message: 'Cập nhật thông tin thành công',
        status: 200,
        data: update,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async lockCompany(id) {
    try {
      const idCompany = parseInt(id);
      const lock = await this.repoCompany.lockAccount(idCompany);
      if (!lock) {
        throw new BadRequestException('Khóa Tài Khoản không thành công');
      }
      return {
        message: 'Khóa tài khoản thành công',
        status: 200,
        data: lock,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async changePassword(dto: ChangePasswordDto) {
    try {
      const { id, matKhau, matKhauMoi } = dto;
      const idCandidate = parseInt(id);
      const hashedPassword = await bcrypt.hash(matKhauMoi, 10);
      const data = {
        id: idCandidate,
        matKhauMoi: hashedPassword,
      };
      const matKhauCu = await this.repoCompany.getMauKhau(idCandidate);
      const isPasswordValid = await bcrypt.compare(matKhau, matKhauCu);

      if (!isPasswordValid) {
        throw new BadRequestException(
          'Mật Khẩu cũ Không chính xác. vui lòng thử lại!',
        );
      }
      const changePassworkAdmin = this.repoCompany.changePassword(data);
      if (!changePassworkAdmin) {
        throw new BadRequestException('Thay đổi mật khẩu thất bại');
      }
      return {
        message: 'Thay đổi mật khẩu thành công',
        status: 200,
        data: changePassworkAdmin,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async addPostJob(id, dto: PostJob) {
    try {
      const {
        idCapDo,
        idTinhThanh,
        idViTri,
        hanChot,
        soLuong,
        luongBatDau,
        luongKetThuc,
        ...rest
      } = dto;
      const ids = parseInt(id);
      const data = {
        idCapDo: parseInt(idCapDo),
        idTinhThanh: parseInt(idTinhThanh),
        idViTri: parseInt(idViTri),
        hanChot: new Date(hanChot),
        soLuong: parseInt(soLuong),
        luongBatDau: parseFloat(luongBatDau),
        luongKetThuc: parseFloat(luongKetThuc),
        ...rest,
      };
      const job = await this.repoPostJob.addPostJob(ids, data);
      if (!job) {
        throw new BadRequestException('Đăng Bài Thất Bại');
      }
      await this.postsGateway.sendNewPost(job);
      return {
        message: 'Đăng Bài Thành Công!',
        status: 200,
        data: job,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updatePostJob(idBD, idCT, dto: PostJob) {
    try {
      const {
        idCapDo,
        idTinhThanh,
        idViTri,
        hanChot,
        soLuong,
        luongBatDau,
        luongKetThuc,
        ...rest
      } = dto;
      idBD = parseInt(idBD);
      idCT = parseInt(idCT);
      const data = {
        idCapDo: parseInt(idCapDo),
        idTinhThanh: parseInt(idTinhThanh),
        idViTri: parseInt(idViTri),
        hanChot: new Date(hanChot),
        soLuong: parseInt(soLuong),
        luongBatDau: parseFloat(luongBatDau),
        luongKetThuc: parseFloat(luongKetThuc),
        ...rest,
      };
      const job = await this.repoPostJob.updatePostJob(idBD, idCT, data);
      if (!job) {
        throw new BadRequestException('Cập Nhật Thất Bại');
      }
      await this.postsGateway.sendUpdatePost(job);
      return {
        message: 'Cập Nhật Thành Công!',
        status: 200,
        data: job,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllPostByCompany(id) {
    try {
      const idCompany = parseInt(id);
      const listJobCompany =
        await this.repoPostJob.getAllPostByCompany(idCompany);
      if (!listJobCompany) {
        throw new BadRequestException('Chưa có bài đăng');
      }
      return {
        message: 'List bài đăng của Công ty ',
        status: 200,
        data: listJobCompany,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // list request
  async addRequestMany(idBaiDang, noiDung: Array<string>) {
    try {
      idBaiDang = parseInt(idBaiDang);
      const add = await this.repoRequest.addRequestMany(idBaiDang, noiDung);
      if (!add) {
        throw new BadRequestException('Thêm yêu cầu thất bại');
      }
      return {
        message: 'Thêm yêu cầu thành công',
        status: 200,
        data: add,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Có lỗi xảy ra');
    }
  }
  async addRequest(idBaiDang, noiDung) {
    try {
      idBaiDang = parseInt(idBaiDang);
      const add = await this.repoRequest.addRequest(idBaiDang, noiDung);
      if (!add) {
        throw new BadRequestException('Thêm yêu cầu thất bại');
      }
      return {
        message: 'Thêm yêu thành công',
        status: 200,
        data: add,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateRequest(idYeuCau, noiDung) {
    try {
      idYeuCau = parseInt(idYeuCau);
      const update = await this.repoRequest.updateRequest(idYeuCau, noiDung);
      if (!update) {
        throw new BadRequestException('cập nhật yêu cầu thất bại');
      }
      return {
        message: 'cập nhật yêu cầu thành công',
        status: 200,
        data: update,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeRequest(idYeuCau) {
    try {
      idYeuCau = parseInt(idYeuCau);
      const remove = await this.repoRequest.removeRequest(idYeuCau);
      if (!remove) {
        throw new BadRequestException('Xóa yêu cầu thất bại');
      }
      return {
        message: 'Xóa yêu cầu thành công',
        status: 200,
        data: remove,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllRequest(idBD) {
    try {
      idBD = parseInt(idBD);
      const listrequest = await this.repoRequest.getAllRequest(idBD);
      if (!listrequest) {
        throw new BadRequestException('Không có yêu cầu nào');
      }
      return {
        message: 'list yều cầu của bài đăng',
        status: 200,
        data: listrequest,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // notification

  async getAllNotifycation(id: string) {
    try {
      const idCandidate = parseInt(id);
      const notifycation =
        await this.repoNotifycation.getThongBaoList(idCandidate);
      if (!notifycation) {
        throw new BadRequestException('Không có thông báo nào');
      }
      return {
        message: 'Đã lấy list thông báo thành công',
        status: 2000,
        data: notifycation,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // list Candidate

  async getAllCandidate(id) {
    try {
      const idBD = parseInt(id);
      const list = await this.repoCandidate.getAllCandidate(idBD);
      const post = await this.repoPostJob.getPostByCompany(idBD);
      if (!list) {
        throw new BadRequestException('Chưa có ứng viên ứng tuyển');
      }
      const baidang = {
        position: post.viTri,
        location: { lat: post.viDo, lon: post.kinhDo }, // Hà Nội
        level: post.mucDo, // Lead
        salary: {
          min: Number(post.luongBatDau),
          max: Number(post.luongKetThuc),
        },
        experience: Number(post.kinhnghiem),
        education_level: post.trinhDo,
      };
      const results = await Promise.all(
        list.map(async (candidates) => {
          const candidate = {
            position: candidates.tenViTri,
            location: { lat: candidates.viDo, lon: candidates.kinhDo },
            level: candidates.mucDo, // Lead
            salary: {
              min: Number(candidates.luongBatDau),
              max: Number(candidates.luongKetThuc),
            },
            experience: candidates.kinhnghiem,
            education_level: candidates.trinhDo,
          };

          const score = await this.repoSimilarity.calculateSimilarity(
            candidate,
            baidang,
          );

          return await { ...candidates, doHopNhau: score };
        }),
      );
      const sortedResults = results.sort((a, b) => b.doHopNhau - a.doHopNhau);
      return {
        message: 'List ứng viên ứng tuyển',
        status: 200,
        data: sortedResults,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateStatusCandidate(idBD, idND, data) {
    try {
      idBD = parseInt(idBD);
      idND = parseInt(idND);
      const update = await this.repoCandidate.updateStatus(
        idBD,
        idND,
        data.newStatus,
      );

      if (!update) {
        throw new BadRequestException('Cập Nhật Không Thành Công');
      }
      const company = await this.repoPostJob.getPostByCompany(idBD);
      const candidate = await this.repoCandidate.getCandidateDetail(idND);
      await this.repoEmailCandidate.sendApplyEmail({
        companyName: company.tenBaiDang,
        companyEmail: company.email,
        candidateEmail: candidate.email,
        jobTitle: company.tenBaiDang,
        jobPosition: company.viTri,
        linkWeb: company.linkWeb,
        jobId: idBD,
        interviewDate: data.newStatus.startTime,
        interviewType: data.newStatus.interviewType,
        interviewLink: data.newStatus.interviewLink,
        interviewDiaChi: data.newStatus.interviewAddress,
      });
      return {
        message: 'Cập Nhật Thành Công',
        status: 200,
        data: update,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async addNotification(idBD, idND) {
    try {
      idBD = parseInt(idBD);
      idND = parseInt(idND);

      const job = await this.repoPostJob.getPostByCompany(idBD);
      const noidung = `Công ty ${job.tenCongTy} Đã Duyệt CV của bạn ở ${job.tenBaiDang}`;
      const notifyction = await this.repoNotifycation.addNotifycation(
        idND,
        idBD,
        noidung,
      );

      if (!notifyction) {
        throw new BadRequestException('Không thể thông báo ');
      }
      await this.postsGateway.sendNewNotificationCandidate(notifyction);
      return {
        status: 200,
        data: notifyction,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateStatusNote(idBD, idND, data) {
    try {
      // Chuyển đổi các tham số idBD và idND thành số
      idBD = parseInt(idBD);
      idND = parseInt(idND);

      if (isNaN(idBD) || isNaN(idND)) {
        throw new BadRequestException('ID không hợp lệ');
      }
      console.log(data.newStatus);

      // Thực hiện cập nhật trạng thái
      const update = await this.repoCandidate.updateNote(
        idBD,
        idND,
        data.newStatus,
      );

      // Kiểm tra nếu không có bản ghi nào được cập nhật
      if (!update) {
        throw new BadRequestException('Cập nhật không thành công');
      }

      // Trả về kết quả khi cập nhật thành công
      return {
        message: 'Cập nhật thành công',
        status: 200,
        data: update,
      };
    } catch (error) {
      // Xử lý lỗi và trả về thông báo lỗi rõ ràng
      throw new BadRequestException(error.message || 'Có lỗi xảy ra');
    }
  }
  async getSchedule(idBD, idND) {
    try {
      // Chuyển đổi các tham số idBD và idND thành số
      idBD = parseInt(idBD);
      idND = parseInt(idND);

      if (isNaN(idBD) || isNaN(idND)) {
        throw new BadRequestException('ID không hợp lệ');
      }

      const data = await this.repoCandidate.getSchedule(idBD, idND);

      if (!data) {
        throw new BadRequestException('lấy dữ liệu không thành công');
      }
      return {
        message: 'lấy dữ liệu thành công',
        status: 200,
        data: data,
      };
    } catch (error) {
      // Xử lý lỗi và trả về thông báo lỗi rõ ràng
      throw new BadRequestException(error.message || 'Có lỗi xảy ra');
    }
  }

  async getDetailCandidate(id) {
    try {
      const ids = parseInt(id);
      const candidate = await this.repoCandidate.getCandidateDetail(ids);
      if (!candidate) {
        throw new BadRequestException('Không tìm thấy tài khoản này');
      }
      return {
        message: 'Đã tìm thấy tài khoản admin',
        status: 200,
        data: candidate,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
