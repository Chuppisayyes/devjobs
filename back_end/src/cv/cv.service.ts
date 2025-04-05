import { BadRequestException, Injectable } from '@nestjs/common';
import { EducationDto } from './dto/education.dto';
import { EducationRepository } from './reponsitory/education.repo';
import { CertificateRepository } from './reponsitory/certificate.repo';
import { ExperienceRepository } from './reponsitory/experience.repo';
import { ProjectRepository } from './reponsitory/project.repo';
import { SkillRepository } from './reponsitory/skill.repo';
import { ExperienceDto } from './dto/experience.dto';
import { CerificateDto } from './dto/certificate.dto';
import { ProjectDto } from './dto/project.dto';
import { SkillDto } from './dto/skill.dto';

@Injectable()
export class CvService {
  constructor(
    private readonly repoEducation: EducationRepository,
    private readonly repoCerificate: CertificateRepository,
    private readonly repoExperience: ExperienceRepository,
    private readonly repoProject: ProjectRepository,
    private readonly repoSkill: SkillRepository,
  ) {}
  async getCV(id) {
    try {
      id = parseInt(id);
      const educations = await this.repoEducation.getAllHocVan(id);
      const cerificates = await this.repoCerificate.getAllChungChi(id);
      const experiences = await this.repoExperience.getAllkinhNghiem(id);
      const projects = await this.repoProject.getAllDuAn(id);
      const skills = await this.repoSkill.getAllSkill(id);

      return {
        hocVan: educations,
        kinhNghiem: experiences,
        kyNang: skills,
        duAn: projects,
        chungChi: cerificates,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addEducation(dto: EducationDto) {
    try {
      const { thoiGianBatDau, thoiGianKetThuc, idNguoiDung, diem, ...rest } =
        dto;
      const data = {
        thoiGianBatDau: new Date(thoiGianBatDau),
        thoiGianKetThuc: new Date(thoiGianKetThuc),
        idNguoiDung: parseInt(idNguoiDung),
        diem: parseFloat(diem),
        ...rest,
      };
      const education = await this.repoEducation.addHocVan(data);
      if (!education) {
        throw new BadRequestException('Thêm Học vấn không thành công');
      }
      return {
        message: ' Thêm học vấn thành công',
        status: 200,
        data: education,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateEducation(id, dto: EducationDto) {
    try {
      id = parseInt(id);
      const { thoiGianBatDau, thoiGianKetThuc, idNguoiDung, diem, ...rest } =
        dto;
      const data = {
        diem: parseFloat(diem),
        thoiGianBatDau: new Date(thoiGianBatDau),
        thoiGianKetThuc: new Date(thoiGianKetThuc),
        idNguoiDung: parseInt(idNguoiDung),
        ...rest,
      };
      const education = await this.repoEducation.updateHocVan(id, data);
      if (!education) {
        throw new BadRequestException('Cập nhật không thành công');
      }
      return {
        message: ' Cập nhật học vấn thành công',
        status: 200,
        data: education,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteEducation(id) {
    try {
      id = parseInt(id);
      const deleteEducation = await this.repoEducation.deleteHocVan(id);
      if (!deleteEducation) {
        throw new BadRequestException('Xóa Học vấn không thành công');
      }
      return {
        message: 'Đã xóa thành công',
        status: 200,
        data: deleteEducation,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async addExperience(dto: ExperienceDto) {
    try {
      const { thoiGianBatDau, thoiGianKetThuc, idNguoiDung, ...rest } = dto;
      const data = {
        thoiGianBatDau: new Date(thoiGianBatDau),
        thoiGianKetThuc: new Date(thoiGianKetThuc),
        idNguoiDung: parseInt(idNguoiDung),
        ...rest,
      };
      const experience = await this.repoExperience.addkinhNghiem(data);
      if (!experience) {
        throw new BadRequestException('Thêm Kinh nghiệm không thành công');
      }
      return {
        message: ' Thêm Kinh nghiệm thành công',
        status: 200,
        data: experience,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateExperience(id, dto: ExperienceDto) {
    try {
      id = parseInt(id);
      const { thoiGianBatDau, thoiGianKetThuc, idNguoiDung, ...rest } = dto;
      const data = {
        thoiGianBatDau: new Date(thoiGianBatDau),
        thoiGianKethuc: new Date(thoiGianKetThuc),
        idNguoiDung: parseInt(idNguoiDung),
        ...rest,
      };
      const experience = await this.repoExperience.updatekinhNghiem(id, data);
      if (!experience) {
        throw new BadRequestException('Cập nhật không thành công');
      }
      return {
        message: ' Cập nhật học vấn thành công',
        status: 200,
        data: experience,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteExperience(id) {
    try {
      id = parseInt(id);
      const deleteExperience = await this.repoExperience.deletekinhNghiem(id);
      if (!deleteExperience) {
        throw new BadRequestException('Xóa Học vấn không thành công');
      }
      return {
        message: 'Đã xóa thành công',
        status: 200,
        data: deleteExperience,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addCerificate(dto: CerificateDto) {
    try {
      const { idNguoiDung, ...rest } = dto;
      const data = {
        idNguoiDung: parseInt(idNguoiDung),
        ...rest,
      };
      const experience = await this.repoCerificate.addChungChi(data);
      if (!experience) {
        throw new BadRequestException('Thêm chứng chỉ không thành công');
      }
      return {
        message: ' Thêm chứng chỉ thành công',
        status: 200,
        data: experience,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateCerificate(id, dto: CerificateDto) {
    try {
      id = parseInt(id);
      const { idNguoiDung, ...rest } = dto;
      const data = {
        idNguoiDung: parseInt(idNguoiDung),
        ...rest,
      };
      const experience = await this.repoCerificate.updateChungChi(id, data);
      if (!experience) {
        throw new BadRequestException('Cập nhật không thành công');
      }
      return {
        message: ' Cập nhật chứng chỉ thành công',
        status: 200,
        data: experience,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteCerificate(id) {
    try {
      id = parseInt(id);
      const deleteCerificate = await this.repoCerificate.deleteChungChi(id);
      if (!deleteCerificate) {
        throw new BadRequestException('Xóa Học vấn không thành công');
      }
      return {
        message: 'Đã xóa thành công',
        status: 200,
        data: deleteCerificate,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addProject(dto: ProjectDto) {
    try {
      const { idNguoiDung, ...rest } = dto;
      const data = {
        idNguoiDung: parseInt(idNguoiDung),
        ...rest,
      };
      const project = await this.repoProject.addDuAn(data);
      if (!project) {
        throw new BadRequestException('Thêm dự án không thành công');
      }
      return {
        message: ' Thêm dự án thành công',
        status: 200,
        data: project,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateProject(id, dto: ProjectDto) {
    try {
      id = parseInt(id);
      const { idNguoiDung, ...rest } = dto;
      const data = {
        idNguoiDung: parseInt(idNguoiDung),
        ...rest,
      };
      const experience = await this.repoProject.updateDuAn(id, data);
      if (!experience) {
        throw new BadRequestException('Cập nhật không thành công');
      }
      return {
        message: ' Cập nhật dự án thành công',
        status: 200,
        data: experience,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteProject(id) {
    try {
      id = parseInt(id);
      const deleteProject = await this.repoProject.deleteDuAn(id);
      if (!deleteProject) {
        throw new BadRequestException('Xóa Học vấn không thành công');
      }
      return {
        message: 'Đã xóa thành công',
        status: 200,
        data: deleteProject,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addSkill(dto: SkillDto) {
    try {
      const { idNguoiDung, idLoaiKN, ...rest } = dto;
      const data = {
        idNguoiDung: parseInt(idNguoiDung),
        idLoaiKN: parseInt(idLoaiKN),
        ...rest,
      };
      const Skill = await this.repoSkill.addSkill(data);
      if (!Skill) {
        throw new BadRequestException('Thêm kỹ năng không thành công');
      }
      return {
        message: ' Thêm kỹ năng thành công',
        status: 200,
        data: Skill,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateSkill(id, dto: SkillDto) {
    try {
      id = parseInt(id);
      const { idNguoiDung, idLoaiKN, ...rest } = dto;
      const data = {
        idNguoiDung: parseInt(idNguoiDung),
        idLoaiKN: parseInt(idLoaiKN),
        ...rest,
      };
      const experience = await this.repoSkill.updateSkill(id, data);
      if (!experience) {
        throw new BadRequestException('Cập nhật không thành công');
      }
      return {
        message: ' Cập nhật kỹ năng thành công',
        status: 200,
        data: experience,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteSkill(id) {
    try {
      id = parseInt(id);
      const deleteSkill = await this.repoSkill.deleteKyNang(id);
      if (!deleteSkill) {
        throw new BadRequestException('Xóa Học vấn không thành công');
      }
      return {
        message: 'Đã xóa thành công',
        status: 200,
        data: deleteSkill,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
