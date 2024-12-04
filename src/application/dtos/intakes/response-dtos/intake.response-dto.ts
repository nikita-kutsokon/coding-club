import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { IntakeType } from '@domain/core/entities/intake.entity';

export class IntakeResponseDto {
    @ApiProperty({
        type: String,
        example: '1234-5678-90ab-cdef',
        description: 'Unique identifier for the intake',
    })
    @Expose()
    id: string;

    @ApiProperty({
        description: 'Name of the intake',
        example: 'Spring 2024 Intake',
    })
    @Expose()
    name: string;

    @ApiProperty({
        type: String,
        example: '2024-04-01T00:00:00.000Z',
        description: 'Date when the intake is launched',
    })
    @Expose()
    launchDate: Date;

    @ApiProperty({
        enum: IntakeType,
        example: IntakeType.WEEKEND,
        description: 'Type of the intake',
    })
    @Expose()
    type: IntakeType;

    @ApiProperty({
        description: 'Indicates whether the intake is open',
        example: true,
    })
    @Expose()
    isOpened: boolean;

    @ApiProperty({
        type: String,
        example: '2024-05-01T00:00:00.000Z',
        description: 'Deadline for application submissions',
    })
    @Expose()
    applicationDeadline: Date;

    @ApiProperty({
        type: String,
        example: '2024-11-05T13:54:51.778Z',
        description: 'Date when the intake was created',
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        type: String,
        example: '2024-11-05T13:54:51.778Z',
        description: 'Date when the intake was last updated',
    })
    @Expose()
    updatedAt: Date;
}
