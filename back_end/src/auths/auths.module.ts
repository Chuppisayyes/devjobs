import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { CompanyRepository } from './reponsitory/companys.repo';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/config/sendmail';
import { AuthRepository } from './reponsitory/auth.repo';
import { CandidateRepository } from './reponsitory/candidate.repo';
import { AdminRepository } from './reponsitory/admin.repo';

@Module({
  controllers: [AuthsController],
  providers: [
    AuthsService,
    CompanyRepository,
    PrismaService,
    EmailService,
    AuthRepository,
    CandidateRepository,
    AdminRepository,
  ],
})
export class AuthsModule {}
