import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { ComanyLoginDto, CompanyRegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { CandidateLoginDto, CandidateRegisterDto } from './dto/candidate.dto';

@Controller('auths')
export class AuthsController {
  constructor(private service: AuthsService) {}
  //auth
  @Get('all-city')
  async getallCity() {
    return await this.service.getAllCity();
  }
  @Get('all-position')
  async getallPosition() {
    return await this.service.getAllPotion();
  }
  @Get('all-level')
  async getallLevel() {
    return await this.service.getAllLevel();
  }
  @Get('all-company')
  async getallCompany() {
    return await this.service.getAllCompany();
  }
  @Get('all-post')
  async getAllPost() {
    return await this.service.getAllPost();
  }
  @Get('post-many')
  async getPostMany() {
    return await this.service.getPostMany();
  }
  @Get('post/:id')
  async getPost(@Param('id') id) {
    return await this.service.getPost(id);
  }
  @Get('all-candidate')
  async getallCandidate() {
    return await this.service.getAllCandidate();
  }
  // Company
  @Post('register-company')
  async registerCompany(@Body() dto: CompanyRegisterDto) {
    return await this.service.registerCompany(dto);
  }
  @Post('login-company')
  async loginCompany(@Body() dto: ComanyLoginDto) {
    return await this.service.loginCompany(dto);
  }
  @Get('verify-email')
  async verifyEmailCompany(
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    await this.service.verifyEmailCompany(token);
    return res.redirect('http://localhost:3000/login');
  }

  @Get('company/:id')
  async getCompany(@Param('id') id) {
    return await this.service.getCompany(id);
  }
  @Get('company/:id/job')
  async getJobCompany(@Param('id') id) {
    return await this.service.getJobCompany(id);
  }
  //Candidate
  @Post('register-candidate')
  async registerCandidate(@Body() dto: CandidateRegisterDto) {
    return await this.service.registerCandidate(dto);
  }
  @Get('verify-email-candidate')
  async verifyEmailCandidate(
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    await this.service.verifyEmailCandidate(token);
    return res.redirect('http://localhost:3000/login');
  }
  @Post('login-candidate')
  async loginCandidate(@Body() dto: CandidateLoginDto) {
    return await this.service.loginCandidate(dto);
  }

  // Admin
  @Post('login-admin')
  async loginAdmin(@Body() dto: CandidateLoginDto) {
    return await this.service.loginAdmin(dto);
  }
  @Get('/:idBD/count')
  async getCountCandidateApply(@Param('idBD') idBD) {
    return await this.service.getCountCandidateApply(idBD);
  }
}
