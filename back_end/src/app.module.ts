import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthsModule } from './auths/auths.module';
import { AdminModule } from './admin/admin.module';
import { CandidateModule } from './candidate/candidate.module';
import { CvModule } from './cv/cv.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    PrismaModule,
    AuthsModule,
    AdminModule,
    CandidateModule,
    CvModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
