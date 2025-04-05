import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from './reponsitory/company.repo';
import { PostJobRepository } from './reponsitory/postJob.repo';
import { RequestRepository } from './reponsitory/request.repo';
import { NotifycationRepository } from './reponsitory/notification.repo';
import { CandidateRepository } from './reponsitory/Candidate.repo';
import { EmailServiceCandidate } from 'src/config/sendEmailCadidate';
import { PostsGateway } from './reponsitory/posts.gateway';
import { SimilarityReponsitory } from 'src/Similarity/Similarity.repo';

@Module({
  controllers: [CompanyController],
  providers: [
    CompanyService,
    CompanyRepository,
    PostJobRepository,
    RequestRepository,
    NotifycationRepository,
    CandidateRepository,
    EmailServiceCandidate,
    PostsGateway,
    SimilarityReponsitory,
  ],
})
export class CompanyModule {}
