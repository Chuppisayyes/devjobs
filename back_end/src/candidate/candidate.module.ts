import { EmailServiceCompany } from './../config/sendEmailCompany';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';
import { CandidateRepository } from './reponsitory/candidate.repo';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { NotifycationRepository } from './reponsitory/notification.repo';
import { PostRepository } from './reponsitory/post.repo';
import { SimilarityReponsitory } from '../Similarity/Similarity.repo';
import { CandidateGateway } from './reponsitory/candidate.gateway';

@Module({
  controllers: [CandidateController],
  providers: [
    CandidateService,
    CandidateRepository,
    NotifycationRepository,
    PostRepository,
    EmailServiceCompany,
    SimilarityReponsitory,
    CandidateGateway,
  ],
})
export class CandidateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware.create(['User']))
      .exclude({ path: '/candidate/*', method: RequestMethod.GET })
      .forRoutes('/candidate/*');
  }
}
