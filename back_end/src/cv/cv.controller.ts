import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { EducationDto } from './dto/education.dto';
import { CerificateDto } from './dto/certificate.dto';
import { ExperienceDto } from './dto/experience.dto';
import { ProjectDto } from './dto/project.dto';
import { SkillDto } from './dto/skill.dto';

@Controller('cv')
export class CvController {
  constructor(private readonly service: CvService) {}
  @Get('/:id')
  async getCV(@Param('id') id) {
    return await this.service.getCV(id);
  }
  @Post('/add/education')
  async addEducation(@Body() dto: EducationDto) {
    return await this.service.addEducation(dto);
  }

  @Put('/update/education/:id')
  async updateEducation(@Param('id') id, @Body() dto: EducationDto) {
    return await this.service.updateEducation(id, dto);
  }
  @Delete('/delete/education/:id')
  async deleteEducation(@Param('id') id) {
    return await this.service.deleteEducation(id);
  }

  @Post('/add/cerificate')
  async addCerificate(@Body() dto: CerificateDto) {
    return await this.service.addCerificate(dto);
  }

  @Put('/update/cerificate/:id')
  async updateCerificate(@Param('id') id, @Body() dto: CerificateDto) {
    return await this.service.updateCerificate(id, dto);
  }

  @Delete('/delete/cerificate/:id')
  async deleteCerificate(@Param('id') id) {
    return await this.service.deleteCerificate(id);
  }

  @Post('/add/experience')
  async addExperience(@Body() dto: ExperienceDto) {
    return await this.service.addExperience(dto);
  }

  @Put('/update/experience/:id')
  async updateExperience(@Param('id') id, @Body() dto: ExperienceDto) {
    return await this.service.updateExperience(id, dto);
  }

  @Delete('/delete/experience/:id')
  async deleteExperience(@Param('id') id) {
    return await this.service.deleteExperience(id);
  }

  @Post('/add/project')
  async addProject(@Body() dto: ProjectDto) {
    return await this.service.addProject(dto);
  }

  @Put('/update/project/:id')
  async updateProject(@Param('id') id, @Body() dto: ProjectDto) {
    return await this.service.updateProject(id, dto);
  }

  @Delete('/delete/project/:id')
  async deleteProject(@Param('id') id) {
    return await this.service.deleteProject(id);
  }

  @Post('/add/skill')
  async addSkill(@Body() dto: SkillDto) {
    return await this.service.addSkill(dto);
  }

  @Put('/update/skill/:id')
  async updateSkill(@Param('id') id, @Body() dto: SkillDto) {
    return await this.service.updateSkill(id, dto);
  }

  @Delete('/delete/skill/:id')
  async deleteSkill(@Param('id') id) {
    return await this.service.deleteSkill(id);
  }
}
