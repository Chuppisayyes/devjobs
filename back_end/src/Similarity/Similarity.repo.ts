import { Injectable } from '@nestjs/common';
import {
  SimilarityRequestDto,
  SalaryDto,
  LocationDto,
} from './dto/Similarity.dto';

@Injectable()
export class SimilarityReponsitory {
  // Tính độ tương đồng tổng thể giữa người dùng và công việc
  async calculateSimilarity(
    user: SimilarityRequestDto,
    job: SimilarityRequestDto,
  ): Promise<number> {
    const weights = {
      position: 0.3,
      location: 0.1,
      level: 0.2,
      education_level: 0.15,
      experience: 0.15,
      salary: 0.1,
    };

    // Tính toán các yếu tố tương đồng
    const positionScore = await this.calculatePositionSimilarity(
      user.position,
      job.position,
    );
    const locationScore = await this.calculateLocationSimilarity(
      user.location,
      job.location,
    );
    const levelScore = await this.calculateLevelSimilarity(
      user.level,
      job.level,
    );
    const educationLevelScore = await this.calculateEducationLevelSimilarity(
      user.education_level,
      job.education_level,
    );
    const salaryScore = await this.calculateSalarySimilarity(
      user.salary,
      job.salary,
    );
    const experienceScore = await this.calculateExperienceSimilarity(
      user.experience,
      job.experience,
    );

    const totalScore =
      positionScore * weights.position +
      locationScore * weights.location +
      levelScore * weights.level +
      salaryScore * weights.salary +
      educationLevelScore * weights.education_level +
      experienceScore * weights.experience;
    const roundedScore = (totalScore * 100).toFixed(2);

    return Number(roundedScore);
  }

  // Tính độ tương đồng giữa vị trí công việc
  private async calculatePositionSimilarity(
    userPosition: string,
    jobPosition: string,
  ): Promise<number> {
    if (userPosition == jobPosition) {
      return 1;
    } else {
      return 0;
    }
  }

  // Tính độ tương đồng vị trí (hàm giả lập khoảng cách)
  private async calculateLocationSimilarity(
    userLocation: LocationDto,
    jobLocation: LocationDto,
  ): Promise<number> {
    const distance = this.haversineDistance(userLocation, jobLocation);
    return Math.max(0, 1 - distance / 1000); // Giới hạn khoảng cách tối đa là 1000 km
  }

  private async calculateLevelSimilarity(
    userLevel: number,
    jobLevel: number,
  ): Promise<number> {
    const difference = Math.abs(userLevel - jobLevel);

    if (difference === 0) {
      return 1;
    } else if (difference === 1) {
      return 0.8;
    } else if (difference === 2) {
      return 0.5;
    } else if (difference === 3) {
      return 0.2;
    } else {
      return 0;
    }
  }

  private async calculateExperienceSimilarity(
    userExperience: number,
    jobExperience: number,
  ): Promise<number> {
    const difference = Math.abs(userExperience - jobExperience);

    if (difference === 0) {
      return 1;
    } else if (difference <= 3) {
      return 0.8;
    } else if (difference <= 6) {
      return 0.5;
    } else if (difference <= 12) {
      return 0.2;
    } else {
      return 0;
    }
  }

  private async calculateSalarySimilarity(
    userSalary: SalaryDto,
    jobSalary: SalaryDto,
  ): Promise<number> {
    const overlap = Math.max(
      0,
      Math.min(userSalary.max, jobSalary.max) -
        Math.max(userSalary.min, jobSalary.min),
    );
    const totalRange =
      Math.max(userSalary.max, jobSalary.max) -
      Math.min(userSalary.min, jobSalary.min);
    return totalRange > 0 ? overlap / totalRange : 0;
  }

  private haversineDistance(
    userLocation: LocationDto,
    jobLocation: LocationDto,
  ): number {
    const R = 6371; // Bán kính trái đất (km)
    const lat1 = this.degreesToRadians(userLocation.lat);
    const lon1 = this.degreesToRadians(userLocation.lon);
    const lat2 = this.degreesToRadians(jobLocation.lat);
    const lon2 = this.degreesToRadians(jobLocation.lon);

    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private async calculateEducationLevelSimilarity(
    education_level_user: string | null,
    education_level_post: string | null,
  ) {
    const education_level = [
      'Chứng chỉ nghề',
      'Cao đẳng',
      'Cử nhân',
      'Kỹ sư',
      'Thạc sĩ',
      'Tiến sĩ',
      'Phó giáo sư',
      'Giáo sư',
    ];

    if (!education_level_post) {
      return 1;
    }
    if (!education_level_user) {
      return 0;
    }

    const educationLevelUser =
      education_level.indexOf(education_level_user) + 1;
    const educationLevelPost =
      education_level.indexOf(education_level_post) + 1;

    if (educationLevelUser === 0) return 0;
    if (educationLevelPost === 0) return 1;

    const chenhlech = Math.abs(educationLevelUser - educationLevelPost);
    if (chenhlech > 3) {
      return 0;
    } else if (chenhlech === 3) {
      return 0.3;
    } else if (chenhlech === 2) {
      return 0.5;
    } else if (chenhlech === 1) {
      return 0.8;
    } else if (chenhlech === 0) {
      return 1;
    }
  }
}
