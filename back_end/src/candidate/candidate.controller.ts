import { Controller, Param, Get, Put, Body, Post } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { ChangePasswordDto, UpdateCandidateDto } from './dto/candidate.dto';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly service: CandidateService) {}

  @Get('/:id')
  async getDetailCandidate(@Param('id') id: string) {
    return await this.service.getDetailCandidate(id);
  }

  @Put('/:id/update')
  async updateCandidate(@Param('id') id, @Body() dto: UpdateCandidateDto) {
    return await this.service.updateCandidate(id, dto);
  }
  @Put('/change-password')
  async changePassword(@Body() dto: ChangePasswordDto) {
    return await this.service.changePassword(dto);
  }
  @Get('/:id/notifycation')
  async getNotifycation(@Param('id') id: string) {
    return await this.service.getAllNotifycation(id);
  }

  @Post('/:idND/add-notifycation/:idBD')
  async addNotifycation(
    @Param('idND') idND: string,
    @Param('idBD') idBD: string,
  ) {
    return await this.service.addNotification(idBD, idND);
  }

  @Post('/:idND/apply/:idBD')
  async applyJob(@Param('idND') idND, @Param('idBD') idBD) {
    return await this.service.applyJob(idND, idBD);
  }

  @Get('/:id/yourjob')
  async getyouJob(@Param('id') id: string) {
    return await this.service.yourJob(id);
  }

  @Get('/:idND/job/:idBD/view-schedule')
  async getSchedule(@Param('idBD') idBD, @Param('idND') idND) {
    return await this.service.getSchedule(idBD, idND);
  }

  @Put('notification/:id')
  async updateNotifi(@Param('id') id: string) {
    return await this.service.updateNotifycation(id);
  }
}
