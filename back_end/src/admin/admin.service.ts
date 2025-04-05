import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthAdminRepository } from './reponsitory/auth.repo';
import {
  AddManagerDto,
  UpdateLevelDto,
  UpdatePositionDto,
  UpdateProvinceDto,
} from './dto/auth.dto';
import { UpdateDto } from './dto/updateTrangThai.dto';
import { CompanyAdminRepository } from './reponsitory/company.repo';
import { PostAdminRepository } from './reponsitory/post.repo';
import { CandidateAdminRepository } from './reponsitory/Candidate.repo';
import { AddAdminDto, ChangePasswordDto, UpdateAdminDto } from './dto/admin';
import { AdminRepository } from './reponsitory/admin.repo';
import * as bcrypt from 'bcrypt';
import { AdminGateway } from './reponsitory/admin.gateway';

@Injectable()
export class AdminService {
  constructor(
    private readonly repoAuth: AuthAdminRepository,
    private readonly repoCompany: CompanyAdminRepository,
    private readonly repoPost: PostAdminRepository,
    private readonly repoCandidate: CandidateAdminRepository,
    private readonly repoAdmin: AdminRepository,
    private readonly repoAdminGateway: AdminGateway,
  ) {}
  async getCountUser() {
    const totall = await this.repoAuth.countUser();
    return {
      totall,
    };
  }
  async getCountCompany() {
    const totall = await this.repoAuth.countCompany();
    return {
      totall,
    };
  }
  async getCountPost() {
    const totall = await this.repoAuth.countPost();
    return {
      totall,
    };
  }

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
  // update manager
  async updatePosition(dto: UpdatePositionDto) {
    try {
      const { idViTri, ...rest } = dto;
      const id = parseInt(idViTri);
      const data = {
        ...rest,
      };
      const position = await this.repoAuth.updatePosition(id, data);

      console.log(position);
      if (!position) {
        throw new BadRequestException('Cập nhật không thành công');
      }
      return {
        status: 200,
        message: 'Cập nhật thành Công',
        data: position,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateProvince(dto: UpdateProvinceDto) {
    try {
      const { idTinhThanh, kinhDo, viDo, ...rest } = dto;
      const id = parseInt(idTinhThanh);
      const kinhdo = parseFloat(kinhDo);
      const vido = parseFloat(viDo);
      const data = {
        ...rest,
        kinhDo: kinhdo,
        viDo: vido,
      };
      const province = await this.repoAuth.updateProvince(id, data);

      console.log(province);
      if (!province) {
        throw new BadRequestException('Cập nhật không thành công');
      }
      return {
        status: 200,
        message: 'Cập nhật thành Công',
        data: province,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateLevel(dto: UpdateLevelDto) {
    try {
      const { idCapDo, mucDo, ...rest } = dto;
      const id = parseInt(idCapDo);
      const data = {
        ...rest,
        mucDo: parseInt(mucDo),
      };
      const level = await this.repoAuth.updateLevel(id, data);

      console.log(level);
      if (!level) {
        throw new BadRequestException('Cập nhật không thành công');
      }
      return {
        status: 200,
        message: 'Cập nhật thành Công',
        data: level,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updatePost(dto: UpdateDto) {
    try {
      const { idUpdate, ...rest } = dto;
      const id = parseInt(idUpdate);
      const data = {
        id,
        ...rest,
      };
      const updatePost = await this.repoPost.updatePost(data);
      if (!updatePost) {
        throw new BadRequestException('Cập nhật không thành công');
      }
      await this.repoAdminGateway.sendUpdatePost(updatePost);
      return {
        status: 200,
        message: 'Cập nhật thành Công',
        data: updatePost,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateCompany(dto: UpdateDto) {
    try {
      const { idUpdate, ...rest } = dto;
      const id = parseInt(idUpdate);
      const data = {
        id,
        ...rest,
      };
      const updateCompany = await this.repoCompany.updateCompany(data);
      if (!updateCompany) {
        throw new BadRequestException('Cập nhật không thành công');
      }
      return {
        status: 200,
        message: 'Cập nhật thành Công',
        data: updateCompany,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateCandidate(dto: UpdateDto) {
    try {
      const { idUpdate, ...rest } = dto;
      const id = parseInt(idUpdate);
      const data = {
        id,
        ...rest,
      };
      const updateCandidate = await this.repoCandidate.updateCandidate(data);
      if (!updateCandidate) {
        throw new BadRequestException('Cập nhật không thành công');
      }
      return {
        status: 200,
        message: 'Cập nhật thành Công',
        data: updateCandidate,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // add manager
  async addPosition(dto: AddManagerDto) {
    try {
      const newPosition = await this.repoAuth.addPosition(dto);
      if (!newPosition) {
        throw new BadRequestException('Thêm vị trí ứng tuyển thất bại !');
      }
      return {
        status: 200,
        message: 'Thêm vị trí ứng tuyển thành Công',
        data: newPosition,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async addLevel(dto: AddManagerDto) {
    try {
      const { mucDo, ...rest } = dto;
      const data = {
        ...rest,
        mucDo: parseInt(mucDo),
      };
      const newLevel = await this.repoAuth.addLevel(data);
      if (!newLevel) {
        throw new BadRequestException('Thêm Cấp Độ thất bại !');
      }
      return {
        status: 200,
        message: 'Thêm Cấp Độ thành Công',
        data: newLevel,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async addProvince(dto: AddManagerDto) {
    try {
      const { kinhDo, viDo, ...rest } = dto;
      const kinhdo = parseFloat(kinhDo);
      const vido = parseFloat(viDo);
      const data = {
        ...rest,
        kinhDo: kinhdo,
        viDo: vido,
      };
      const newProvince = await this.repoAuth.addProvince(data);
      if (!newProvince) {
        throw new BadRequestException('Thêm tỉnh công thất bại !');
      }
      return {
        status: 200,
        message: 'Thêm tỉnh công thành Công',
        data: newProvince,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // manager admin
  async addAdmin(dto: AddAdminDto) {
    try {
      const { email, matKhau, ngaySinh, ...rest } = dto;
      const checkEmail = await this.repoAdmin.checkAdmin(email);
      if (!checkEmail) {
        throw new BadRequestException('email đã tồn tại');
      }
      const hashedPassword = await bcrypt.hash(matKhau, 10);
      const ngaySinhs = new Date(ngaySinh);

      const data = {
        ngaySinh: ngaySinhs,
        email,
        matKhau: hashedPassword,
        ...rest,
      };
      console.log(data);
      const newAdmin = this.repoAdmin.addAdmin(data);
      if (!newAdmin) {
        throw new BadRequestException('Thêm tài khoản admin thất bại');
      }
      return {
        message: 'Đăng kí tài khoản admin thành công',
        status: 200,
        data: newAdmin,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateAdmin(dto: UpdateAdminDto) {
    try {
      const updateAdmin = this.repoAdmin.updateProfileAdmin(dto);
      if (!updateAdmin) {
        throw new BadRequestException('Cập nhật tài khoản thất bại');
      }
      return {
        message: 'Cập nhật tài khoản  thành công',
        status: 200,
        data: updateAdmin,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changePassword(dto: ChangePasswordDto) {
    try {
      const { id, matKhau, matKhauMoi } = dto;
      const idAdmin = parseInt(id);
      const hashedPassword = await bcrypt.hash(matKhauMoi, 10);
      const data = {
        id: idAdmin,
        matKhauMoi: hashedPassword,
      };
      const matKhauCu = await this.repoAdmin.getMauKhau(idAdmin);
      const isPasswordValid = await bcrypt.compare(matKhau, matKhauCu);

      if (!isPasswordValid) {
        throw new BadRequestException(
          'Mật Khẩu cũ Không chính xác. vui lòng thử lại!',
        );
      }
      const changePassworkAdmin = this.repoAdmin.changePassword(data);
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
  async getDetailAdmin(id) {
    try {
      const ids = parseInt(id);
      const admin = await this.repoAdmin.getAdminDetail(ids);
      if (!admin) {
        throw new BadRequestException('Không tìm thấy tài khoản này');
      }
      return {
        message: 'Đã tìm thấy tài khoản admin',
        status: 200,
        data: admin,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
