import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Delete,
  Get,
} from '@nestjs/common';

import { ChangePasswordDto, UpdateCompanyDto } from './dto/company.dto';
import { CompanyService } from './company.service';
import { PostJob } from './dto/post.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}
  @Get('/:idCT')
  async getCompanyDetail(@Param('idCT') idCT) {
    return await this.service.getCompanyDetail(idCT);
  }

  @Put('/:idCT/lock-account')
  async updateCompanyStatus(@Param('idCT') idCT) {
    return await this.service.lockCompany(idCT);
  }

  @Put('/:idCT/update')
  async updateCompany(@Param('idCT') idCT, @Body() dto: UpdateCompanyDto) {
    return await this.service.updateCompany(idCT, dto);
  }

  @Put('/change-password')
  async changePassword(@Body() dto: ChangePasswordDto) {
    return await this.service.changePassword(dto);
  }

  @Post('/:idCT/job/add')
  async addPostjob(@Param('idCT') idCT: number, @Body() dto: PostJob) {
    return await this.service.addPostJob(idCT, dto);
  }
  @Put('/:idCT/job/:idBD/update')
  async updatePostjob(
    @Param('idCT') idCT: number,
    @Param('idBD') idBD: number,
    @Body() dto: PostJob,
  ) {
    return await this.service.updatePostJob(idBD, idCT, dto);
  }

  @Get('/:idCT/all-job')
  async getAllPostByCompany(@Param('idCT') idCT: number) {
    return await this.service.getAllPostByCompany(idCT);
  }
  // request
  @Post('request/:idBD/add')
  async addRequest(@Param('idBD') idBD, @Body() noiDung) {
    console.log(noiDung);
    return await this.service.addRequest(idBD, noiDung.noiDung);
  }
  @Post('request/:idBD/add-many')
  async addRequestMany(@Param('idBD') idBD, @Body() noiDung: Array<string>) {
    return await this.service.addRequestMany(idBD, noiDung);
  }

  @Put('request/:idYC/update')
  async updateRequest(@Param('idYC') idYC, @Body() noiDung) {
    return await this.service.updateRequest(idYC, noiDung.noiDung);
  }
  @Delete('request/:idYC/remove')
  async removeRequest(@Param('idYC') idYC: number) {
    return await this.service.removeRequest(idYC);
  }
  @Get('/:idBD/all-request')
  async getAllRequest(@Param('idBD') idBD: number) {
    return await this.service.getAllRequest(idBD);
  }
  // notifycation
  @Get('/:id/notifycation')
  async getNotifycation(@Param('id') id: string) {
    return await this.service.getAllNotifycation(id);
  }

  // list candidate
  @Get('all-candidate/:idDB')
  async getAllCandidate(@Param('idDB') idDB: number) {
    return await this.service.getAllCandidate(idDB);
  }
  @Put('job/:idBD/update-status/candidate/:idND')
  async updateStatusCandidate(
    @Param('idBD') idBD,
    @Param('idND') idND,
    @Body() data,
  ) {
    return await this.service.updateStatusCandidate(idBD, idND, data);
  }
  @Put('job/:idBD/update-note/candidate/:idND')
  async updateNoteCandidate(
    @Param('idBD') idBD,
    @Param('idND') idND,
    @Body() data,
  ) {
    return await this.service.updateStatusNote(idBD, idND, data);
  }

  @Post('/:idBD/add-notifycation/:idND')
  async addNotifycation(
    @Param('idND') idND: string,
    @Param('idBD') idBD: string,
  ) {
    return await this.service.addNotification(idBD, idND);
  }

  @Get('job/:idBD/view-schedule/candidate/:idND')
  async getSchedule(@Param('idBD') idBD, @Param('idND') idND) {
    return await this.service.getSchedule(idBD, idND);
  }

  @Get('candidate/:id')
  async getDetailCandidate(@Param('id') id: string) {
    return await this.service.getDetailCandidate(id);
  }
}
