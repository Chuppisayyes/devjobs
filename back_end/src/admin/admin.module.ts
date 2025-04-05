import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { AuthAdminRepository } from './reponsitory/auth.repo';
import { CompanyAdminRepository } from './reponsitory/company.repo';
import { CandidateAdminRepository } from './reponsitory/Candidate.repo';
import { PostAdminRepository } from './reponsitory/post.repo';
import { AdminRepository } from './reponsitory/admin.repo';
import { AdminGateway } from './reponsitory/admin.gateway';

@Module({
  controllers: [AdminController],
  // eslint-disable-next-line prettier/prettier
  providers: [
    AdminService,
    AuthAdminRepository,
    CompanyAdminRepository,
    PostAdminRepository,
    CandidateAdminRepository,
    AdminRepository,
    AdminGateway,
  ],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware.create(['Admin'])) // Inject roles here
      .forRoutes('/admins/*'); // Route cần bảo vệ
  }
}
