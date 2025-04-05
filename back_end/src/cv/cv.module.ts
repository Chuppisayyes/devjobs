import { Module } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { EducationRepository } from './reponsitory/education.repo';
import { CertificateRepository } from './reponsitory/certificate.repo';
import { ExperienceRepository } from './reponsitory/experience.repo';
import { ProjectRepository } from './reponsitory/project.repo';
import { SkillRepository } from './reponsitory/skill.repo';

@Module({
  controllers: [CvController],
  providers: [
    CvService,
    EducationRepository,
    CertificateRepository,
    ExperienceRepository,
    ProjectRepository,
    SkillRepository,
  ],
})
export class CvModule {}
