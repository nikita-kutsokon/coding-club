import { IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import Intake, { IntakeType } from '@domain/core/entities/intake.entity';
import { Type } from 'class-transformer';

export class CreateIntakeRequestDto {
    @ApiProperty({
        description: 'The launch date of the intake',
        example: '2024-03-09T14:00:00Z',
    })
    @IsDate()
    @Type(() => Date)
    launchDate: Date;

    @ApiProperty({
        description: 'The type of the intake (e.g., WEEKDAY, WEEKEND)',
        example: 'WEEKDAY',
        enum: IntakeType,
    })
    @IsEnum(IntakeType)
    type: IntakeType;

    @ApiProperty({
        description: 'The application deadline for the intake',
        example: '2024-03-09T00:00:00Z',
    })
    @IsDate()
    @Type(() => Date)
    applicationDeadline: Date;

    static toEntity(dto: CreateIntakeRequestDto): Intake {
        const intake = new Intake();

        intake.type = dto.type;
        intake.launchDate = dto.launchDate;
        intake.applicationDeadline = dto.applicationDeadline;

        return intake;
    }
}
