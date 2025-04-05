import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  AddManagerDto,
  UpdateLevelDto,
  UpdatePositionDto,
  UpdateProvinceDto,
} from './dto/auth.dto';
import { UpdateDto } from './dto/updateTrangThai.dto';
import { AddAdminDto, ChangePasswordDto, UpdateAdminDto } from './dto/admin';

@Controller('admins')
export class AdminController {
  constructor(private readonly service: AdminService) {}
  // hệ thống
  @Get('/total-user')
  async getTotalUser() {
    return await this.service.getCountUser();
  }
  @Get('/total-company')
  async getTotalCompany() {
    return await this.service.getCountCompany();
  }
  @Get('/total-post')
  async getTotalPost() {
    return await this.service.getCountPost();
  }
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

  @Get('all-candidate')
  async getallCandidate() {
    return await this.service.getAllCandidate();
  }

  @Put('/update/position')
  async updatePotion(@Body() dto: UpdatePositionDto) {
    return await this.service.updatePosition(dto);
  }
  @Put('/update/province')
  async updateProvince(@Body() dto: UpdateProvinceDto) {
    return await this.service.updateProvince(dto);
  }
  @Put('/update/level')
  async updateLevel(@Body() dto: UpdateLevelDto) {
    return await this.service.updateLevel(dto);
  }

  @Put('/update/post')
  async updatePost(@Body() dto: UpdateDto) {
    return await this.service.updatePost(dto);
  }

  @Put('/update/company')
  async updateCompany(@Body() dto: UpdateDto) {
    return await this.service.updateCompany(dto);
  }

  @Put('/update/candidate')
  async updateCandidate(@Body() dto: UpdateDto) {
    return await this.service.updateCandidate(dto);
  }

  @Post('/add/position')
  async addPosition(@Body() dto: AddManagerDto) {
    return await this.service.addPosition(dto);
  }

  @Post('/add/level')
  async addLevel(@Body() dto: AddManagerDto) {
    return await this.service.addLevel(dto);
  }
  @Post('/add/province')
  async addProvince(@Body() dto: AddManagerDto) {
    return await this.service.addProvince(dto);
  }
  // cá nhân addmin

  @Post('/add/admin')
  async addAdmin(@Body() dto: AddAdminDto) {
    return await this.service.addAdmin(dto);
  }
  @Put('/update/admin')
  async updateAdmin(@Body() dto: UpdateAdminDto) {
    return await this.service.updateAdmin(dto);
  }

  @Put('/change-password/admin')
  async changePassword(@Body() dto: ChangePasswordDto) {
    return await this.service.changePassword(dto);
  }

  @Get('/admin/:id')
  async getAdmin(@Param('id') id: string) {
    return await this.service.getDetailAdmin(id);
  }
}
