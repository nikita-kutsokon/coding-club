import { Type } from 'class-transformer';
import { IsString, IsDate, IsEnum, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import Intake, { IntakeType } from '@domain/core/entities/intake.entity';

export class UpdateIntakeRequestDto {
    @ApiProperty({
        description: 'The name of the intake',
        example: 'Sample Intake Update',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

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
        description: 'Indicates if the intake is currently open',
        example: true,
    })
    @IsBoolean()
    isOpened: boolean;

    @ApiProperty({
        description: 'The application deadline for the intake',
        example: '2024-03-09T00:00:00Z',
    })
    @IsDate()
    @Type(() => Date)
    applicationDeadline: Date;

    static toEntity(dto: UpdateIntakeRequestDto): Intake {
        const intake = new Intake();

        intake.name = dto.name;
        intake.type = dto.type;
        intake.isOpened = dto.isOpened;
        intake.launchDate = dto.launchDate;
        intake.applicationDeadline = dto.applicationDeadline;

        return intake;
    }
}
