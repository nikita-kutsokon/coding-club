import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ControllerDocumentation(schema: {
    tag: string;
    description: string;
    operations: {
        method: string;
        summary: string;
        responses: Record<number, { status: number; description: string; content?: any }>;
    }[];
}): ClassDecorator & MethodDecorator {
    return (target: any) => {
        ApiTags(schema.tag)(target);
        schema.operations.forEach(op => {
            const methodDecorator = applyDecorators(
                ApiOperation({ summary: op.summary, description: schema.description }),
                ...Object.entries(op.responses).map(([status, resp]) =>
                    ApiResponse({
                        status: Number(status),
                        description: resp.description,
                        content: resp.content,
                    }),
                ),
            );

            const method = target.prototype[op.method];
            if (method) {
                methodDecorator(target.prototype, op.method, Object.getOwnPropertyDescriptor(target.prototype, op.method));
            }
        });
    };
}
