import { IsOptional, IsString, IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IntakeType } from '@domain/core/entities/intake.entity';

export class IntakeFilterDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Filter by intake name',
        type: String,
        required: false,
    })
    name?: string;

    @IsOptional()
    @IsEnum(IntakeType)
    @ApiProperty({
        description: 'Filter by intake type (WEEKDAY or WEEKEND)',
        enum: IntakeType,
        required: false,
    })
    type?: IntakeType;

    @IsOptional()
    @IsDate()
    @ApiProperty({
        description: 'Filter by launch date (ISO8601 format)',
        type: String,
        format: 'date-time',
        required: false,
    })
    launchDate?: Date;
}
