import { Transform } from 'class-transformer';
import { IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IntakeSortDto {
    @IsOptional()
    @IsEnum(['name', 'type', 'launchDate'])
    @Transform(({ obj }) => obj['sorted_by'], { toClassOnly: true })
    @ApiProperty({
        name: 'sorted_by',
        type: String,
        enum: ['name', 'type', 'launchDate'],
        required: false,
        description: 'Field by which to sort the list of intakes',
    })
    sortBy?: 'name' | 'type' | 'launchDate';

    @IsOptional()
    @IsEnum(['asc', 'desc'])
    @ApiProperty({
        type: String,
        enum: ['asc', 'desc'],
        required: false,
        description: 'Sort order (asc for ascending or desc for descending)',
    })
    order?: 'asc' | 'desc';
}
