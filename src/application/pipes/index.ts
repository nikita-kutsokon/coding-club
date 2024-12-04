import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform {
    transform(value: any, _: ArgumentMetadata) {
        const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value);

        if (!isUuid) {
            throw new BadRequestException('ID must be either a valid UUID or a valid number');
        }

        return value;
    }
}
