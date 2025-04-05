// src/similarity/dto/similarity-request.dto.ts

import { IsString, IsObject, IsOptional, IsNumber } from 'class-validator';

export class SimilarityRequestDto {
  @IsString()
  position: string;

  @IsObject()
  @IsOptional()
  location?: LocationDto;

  @IsNumber()
  level: number;

  @IsObject()
  salary: SalaryDto;

  @IsString()
  education_level: string;

  @IsNumber()
  experience: number;
}

export class SalaryDto {
  @IsNumber()
  min: number;

  @IsNumber()
  max: number;
}

export class LocationDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;
}
