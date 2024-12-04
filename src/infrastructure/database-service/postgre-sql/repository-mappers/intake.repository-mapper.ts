import { Intake as PrismaIntake, IntakeType as PrismaIntakeType } from '@prisma/client';

import Intake, { IntakeType } from '@domain/core/entities/intake.entity';

class IntakeRepositoryMapper {
    private intakeTypeMapping: { [key in PrismaIntakeType]: IntakeType } = {
        [PrismaIntakeType.WEEKEND]: IntakeType.WEEKEND,
        [PrismaIntakeType.WEEKDAY]: IntakeType.WEEKDAY,
    };

    private prismaIntakeTypeMapping: { [key in IntakeType]: PrismaIntakeType } = {
        [IntakeType.WEEKEND]: PrismaIntakeType.WEEKEND,
        [IntakeType.WEEKDAY]: PrismaIntakeType.WEEKDAY,
    };

    public mapDataObjectToEntity(data: PrismaIntake): Intake {
        const intake = new Intake();

        intake.id = data.id;
        intake.name = data.name;
        intake.isOpened = data.isOpened;
        intake.launchDate = data.launchDate;
        intake.applicationDeadline = data.applicationDeadline;

        intake.type = this.intakeTypeMapping[data.type];

        intake.createdAt = data.createdAt;
        intake.updatedAt = data.updatedAt;

        return intake;
    }

    public mapEntityToDataObject(data: Intake): PrismaIntake {
        return {
            id: data.id,
            name: data.name,
            isOpened: data.isOpened,
            launchDate: data.launchDate,
            applicationDeadline: data.applicationDeadline,

            type: this.prismaIntakeTypeMapping[data.type],

            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    }
}

export default IntakeRepositoryMapper;
