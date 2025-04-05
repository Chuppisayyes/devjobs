import { Injectable, BadRequestException } from '@nestjs/common';
import { ComanyLoginDto, CompanyRegisterDto } from './dto/register.dto';
import { CompanyRepository } from './reponsitory/companys.repo';
import { EmailService } from '../config/sendmail';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthRepository } from './reponsitory/auth.repo';
import { CandidateRepository } from './reponsitory/candidate.repo';
import { AdminRepository } from './reponsitory/admin.repo';
import { CandidateLoginDto, CandidateRegisterDto } from './dto/candidate.dto';

@Injectable()
export class AuthsService {
  constructor(
    private readonly repoCompany: CompanyRepository,
    private readonly repoCandidate: CandidateRepository,
    private readonly repoAuth: AuthRepository,
    private readonly repoAdmin: AdminRepository,
    private readonly sendEmail: EmailService,
  ) {}
  // auth
  async getAllCity() {
    try {
      const allCity = await this.repoAuth.getAllCity();
      if (!allCity) {
        throw new BadRequestException('Không có Tỉnh Thành nào');
      }
      return allCity;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getAllPotion() {
    try {
      const allPosition = await this.repoAuth.getAllPosition();
      if (!allPosition) {
        throw new BadRequestException('Không có Vị Tri Ứng Tuyển nào');
      }
      return allPosition;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getAllLevel() {
    try {
      const allPosition = await this.repoAuth.getAllLevel();
      if (!allPosition) {
        throw new BadRequestException('Không có Level nào');
      }
      return allPosition;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getAllCompany() {
    try {
      const allCompany = await this.repoAuth.getAllCompany();
      if (!allCompany) {
        throw new BadRequestException('Không có công ty nào');
      }
      return allCompany;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getAllPost() {
    try {
      const allPost = await this.repoAuth.getAllPost();
      if (!allPost) {
        throw new BadRequestException('Không có bài đăng nào');
      }
      return allPost;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getPostMany() {
    try {
      const allPost = await this.repoAuth.getPostMany();
      if (!allPost) {
        throw new BadRequestException('Không có bài đăng nào');
      }
      return allPost;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getAllCandidate() {
    try {
      const allCandidate = await this.repoAuth.getAllCandidate();
      if (!allCandidate) {
        throw new BadRequestException('Không có người dùng nào');
      }
      return allCandidate;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getPost(id) {
    try {
      id = parseInt(id);
      const allPost = await this.repoAuth.getPost(id);
      if (!allPost) {
        throw new BadRequestException('Không có bài đăng này');
      }
      return allPost;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // Company
  async registerCompany(datas: CompanyRegisterDto) {
    const { email, matKhau, ...rest } = datas;
    try {
      const existingCompany = await this.repoCompany.existingCompany(email);
      if (!existingCompany) {
        throw new BadRequestException('email đã tồn tai');
      }
      const idLoaiTK = 2;
      const hashedPassword = await bcrypt.hash(matKhau, 10);
      const datas = {
        email,
        idLoaiTK,
        matKhau: hashedPassword,
        xacThuc: false,
        ...rest,
      };
      const company = await this.repoCompany.registerCompany(datas);
      const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      const verifyUrl = `http://localhost:5000/auths/verify-email?token=${verificationToken}`;
      await this.sendEmail.sendVerificationEmail(email, verifyUrl);
      return {
        statusCode: 200,
        message: 'Đăng ký thành công! Vui lòng xác thực email trong 24h tới',
        company: company,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Thông tin không hợp lệ');
    }
  }
  async verifyEmailCompany(token: string) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
      const { email } = decoded;

      const company = await this.repoCompany.checkCompany(email);
      if (!company) {
        throw new BadRequestException('Email không hợp lệ.');
      }
      const xacthuc = { xacThuc: true };
      await this.repoCompany.updateCompany(company.idCongTy, xacthuc);

      return {
        statusCode: 200,
        message: 'Email đã được xác thực thành công!',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async loginCompany(data: ComanyLoginDto) {
    const { email, matKhau } = data;
    try {
      const company = await this.repoCompany.checkCompany(email);
      if (!company) {
        throw new BadRequestException('Tài khoản không tồn tại!');
      }
      if (company.xacThuc === false) {
        throw new BadRequestException('Tài khoản chưa xác thực!');
      }
      if (company.trangThai != 'Đã Duyệt') {
        throw new BadRequestException(` Tài Khoản ${company.trangThai}`);
      }
      const isPasswordValid = await bcrypt.compare(matKhau, company.matKhau);
      if (!isPasswordValid) {
        throw new BadRequestException('Mật khẩu không chính xác');
      }
      const quyen = company.loaiTaiKhoan?.quyen || 'User';

      const payload = {
        id: company.idCongTy,
        email: company.email,
        quyen,
      };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      return {
        message: 'Đăng nhập thành công',
        token,
        data: {
          id: company.idCongTy,
          email: company.email,
          ten: company.tenCongTy,
          quyen,
          avatar: company.logo,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCompany(id) {
    try {
      id = parseInt(id);
      const company = await this.repoCompany.getCompany(id);
      if (!company) {
        throw new BadRequestException(`Không tìm thấy công ty id : ${id}`);
      }
      return company;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getJobCompany(id) {
    try {
      id = parseInt(id);
      const company = await this.repoCompany.getJobCompany(id);
      if (!company) {
        throw new BadRequestException(
          `Không tìm thấy bài đăng nào của công ty : ${id}`,
        );
      }
      return company;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Canditate
  async registerCandidate(datas: CandidateRegisterDto) {
    const { email, matKhau, ...rest } = datas;
    try {
      const existingCandidate =
        await this.repoCandidate.existingCandidate(email);
      if (!existingCandidate) {
        throw new BadRequestException('email đã tồn tai');
      }
      const idLoaiTK = 3;
      const hashedPassword = await bcrypt.hash(matKhau, 10);
      const datas = {
        email,
        idLoaiTK,
        matKhau: hashedPassword,
        xacThuc: false,
        ...rest,
      };
      const Candidate = await this.repoCandidate.registerCandidate(datas);
      const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      const verifyUrl = `http://localhost:5000/auths/verify-email-candidate?token=${verificationToken}`;
      await this.sendEmail.sendVerificationEmail(email, verifyUrl);
      return {
        statusCode: 200,
        message: 'Đăng ký thành công! Vui lòng xác thực email trong 24h tới',
        Candidate: Candidate,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Thông tin không hợp lệ');
    }
  }
  async verifyEmailCandidate(token: string) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
      const { email } = decoded;

      const candidate = await this.repoCandidate.checkCandidate(email);

      if (!candidate) {
        throw new BadRequestException('Email không hợp lệ.');
      }
      const xacthuc = { xacThuc: true };
      await this.repoCandidate.updateCandidate(
        candidate[0].idNguoiDung,
        xacthuc,
      );

      return {
        statusCode: 200,
        message: 'Email đã được xác thực thành công!',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async loginCandidate(data: CandidateLoginDto) {
    const { email, matKhau } = data;
    try {
      const candidate = await this.repoCandidate.checkCandidate(email);
      if (!candidate) {
        throw new BadRequestException('Tài khoản không tồn tại!');
      }
      if (candidate[0].xacThuc === false) {
        throw new BadRequestException('Tài khoản chưa xác thực!');
      }
      if (candidate[0].trangThai != 'Đã Duyệt') {
        throw new BadRequestException(` Tài Khoản ${candidate[0].trangThai}`);
      }
      const isPasswordValid = await bcrypt.compare(
        matKhau,
        candidate[0].matKhau,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Mật khẩu không chính xác');
      }
      const quyen = candidate[0].loaiTaiKhoan?.quyen || 'User';

      const payload = {
        id: candidate[0].idNguoiDung,
        email: candidate[0].email,
        ten: candidate[0].ten,
        quyen,
      };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      return {
        message: 'Đăng nhập thành công',
        token,
        data: {
          id: candidate[0].idNguoiDung,
          email: candidate[0].email,
          ten: candidate[0].ten,
          quyen,
          avatar: candidate[0].anhDaiDien,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getCountCandidateApply(idBD) {
    try {
      const count = await this.repoAuth.countCandidate(parseInt(idBD));
      if (!count) {
        throw new BadRequestException('Không thể tìm thấy list ứng viên');
      }
      return {
        message: 'lấy số lượng ứng viên thành công',
        status: 200,
        data: count,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // Admin
  async loginAdmin(data: CandidateLoginDto) {
    const { email, matKhau } = data;

    const admin = await this.repoAdmin.checkAdmin(email);
    if (!admin) {
      throw new BadRequestException('tài khoản không tồn tại');
    }
    console.log(admin.matKhau);
    const isPasswordValid = await bcrypt.compare(matKhau, admin.matKhau);
    if (!isPasswordValid) {
      throw new BadRequestException('mật khẩu không chinh xác');
    }
    const quyen = admin?.quyen || 'User';
    const payload = {
      id: admin.id,
      email: admin.email,
      ten: admin.ten,
      quyen,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return {
      message: 'Đăng nhập thành công',
      token,
      data: {
        id: admin.id,
        email: admin.email,
        ten: admin.ten,
        quyen,
      },
    };
  }
}
