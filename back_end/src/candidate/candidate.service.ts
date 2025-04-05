import { BadRequestException, Injectable } from '@nestjs/common';
import { CandidateRepository } from './reponsitory/candidate.repo';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto, UpdateCandidateDto } from './dto/candidate.dto';
import { NotifycationRepository } from './reponsitory/notification.repo';
import { PostRepository } from './reponsitory/post.repo';
import { EmailServiceCompany } from 'src/config/sendEmailCompany';
import { SimilarityReponsitory } from '../Similarity/Similarity.repo';
import { CandidateGateway } from './reponsitory/candidate.gateway';

@Injectable()
export class CandidateService {
  constructor(
    private readonly repoCandidate: CandidateRepository,
    private readonly repoNotifycation: NotifycationRepository,
    private readonly repoPost: PostRepository,
    private readonly sendEmailCompany: EmailServiceCompany,
    private readonly repoSimilarity: SimilarityReponsitory,
    private readonly repoGateway: CandidateGateway,
  ) {}

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
  async updateCandidate(id, dto: UpdateCandidateDto) {
    try {
      const { ngaySinh, idCapDo, idTinhThanh, idViTri, ...rest } = dto;
      const idCandidate = parseInt(id);

      const data = {
        ...rest,
        idCapDo: parseInt(idCapDo),
        idTinhThanh: parseInt(idTinhThanh),
        idViTri: parseInt(idViTri),
        ngaySinh: new Date(ngaySinh),
      };

      const updateCandidates = this.repoCandidate.updateProfileCandidate(
        idCandidate,
        data,
      );
      if (!updateCandidates) {
        throw new BadRequestException('Cập nhật tài khoản thất bại');
      }
      return {
        message: 'Cập nhật tài khoản  thành công',
        status: 200,
        data: updateCandidates,
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
      const matKhauCu = await this.repoCandidate.getMauKhau(idCandidate);
      const isPasswordValid = await bcrypt.compare(matKhau, matKhauCu);

      if (!isPasswordValid) {
        throw new BadRequestException(
          'Mật Khẩu cũ Không chính xác. vui lòng thử lại!',
        );
      }
      const changePassworkAdmin = this.repoCandidate.changePassword(data);
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
        status: 200,
        data: notifycation,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateNotifycation(id: string) {
    try {
      const notifi = parseInt(id);
      const update = await this.repoNotifycation.updateNotification(notifi);
      if (!update) {
        throw new BadRequestException('Không có thông báo nào');
      }
      return {
        message: 'Đã đọc thông báo',
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

      const candidate = await this.repoCandidate.getCandidateDetail(idND);
      const job = await this.repoPost.getJobPostInfo(idBD);
      const noidung = ` Ứng Viên ${candidate.ten} Đã Apply bài viết ${job.tenBaiDang} của bạn`;

      const notifyction = await this.repoNotifycation.addNotifycation(
        job.idCongTy,
        idBD,
        noidung,
      );

      if (!notifyction) {
        throw new BadRequestException('Không thể thông báo ');
      }
      await this.repoGateway.sendNewNotificationCompany(notifyction);
      return {
        status: 200,
        data: notifyction,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async applyJob(idND, idBD) {
    try {
      idBD = parseInt(idBD);
      idND = parseInt(idND);
      const check = await this.repoCandidate.checkApply(idND, idBD);
      if (check) {
        throw new BadRequestException('Bạn Đã nộp CV trước đó ');
      }
      const apply = await this.repoCandidate.applyJob(idND, idBD);
      if (!apply) {
        throw new BadRequestException('Bạn Đã Gửi CV  Thất Bại');
      }
      // Lấy thông tin cần thiết để gửi email
      const candidate = await this.repoCandidate.getCandidateDetail(idND);
      const jobPost = await this.repoPost.getJobPostInfo(idBD);

      // Gửi email thông báo
      await this.sendEmailCompany.sendApplyEmail({
        candidateName: candidate.ten,
        candidateEmail: candidate.email,
        jobTitle: jobPost.tenBaiDang,
        companyEmail: jobPost.email,
        jobId: idBD.toString(),
        cvUrl: `http://localhost:3000/view/CV/${candidate.idNguoiDung}`,
      });
      await this.repoGateway.sendApply(apply);
      return {
        message: 'Bạn Đã Gửi CV Thành Công',
        status: 200,
        data: apply,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async yourJob(idND) {
    const id = parseInt(idND);
    const candidates = await this.repoCandidate.getCandidateDetail(id);

    const posts = await this.repoPost.getAllPost();
    const candidate = {
      position: candidates.tenVitri,
      location: { lat: candidates.viDo, lon: candidates.kinhDo },
      level: candidates.mucDo, // Lead
      salary: {
        min: Number(candidates.luongBatDau),
        max: Number(candidates.luongKetThuc),
      },
      experience: candidates.kinhnghiem,
      education_level: candidates.trinhDo,
    };

    const results = await Promise.all(
      posts.map(async (post) => {
        const baidang = {
          position: post.tenViTri,
          location: { lat: post.viDo, lon: post.kinhDo }, // Hà Nội
          level: post.mucDo, // Lead
          salary: {
            min: Number(post.luongBatDau),
            max: Number(post.luongKetThuc),
          },
          experience: Number(post.kinhnghiem),
          education_level: post.trinhDo,
        };

        const score = await this.repoSimilarity.calculateSimilarity(
          candidate,
          baidang,
        );

        return { ...post, doHopNhau: score };
      }),
    );
    const filteredResults = results.filter((result) => result.doHopNhau >= 60);
    const sortedResults = filteredResults.sort(
      (a, b) => b.doHopNhau - a.doHopNhau,
    );

    return {
      message: 'Lấy danh sách phù hợp thành công',
      status: 200,
      data: sortedResults,
    };
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
      throw new BadRequestException(error.message || 'Có lỗi xảy ra');
    }
  }
}
