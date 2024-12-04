import { IntakeType } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const generateIntakeData = (): Array<{
    name: string;
    launchDate: Date;
    type: IntakeType;
    isOpened: boolean;
    applicationDeadline: Date;
}> => {
    return Array.from({ length: 15 }).map(() => {
        const launchDate = faker.date.future();
        const applicationDeadline = faker.date.past({ years: 1 });

        return {
            name: faker.company.catchPhrase(),
            launchDate: launchDate,
            type: faker.helpers.arrayElement([IntakeType.WEEKEND, IntakeType.WEEKDAY]),
            isOpened: faker.datatype.boolean(),
            applicationDeadline: applicationDeadline,
        };
    });
};
