import BaseEntity from './base.entity';

export enum IntakeType {
    WEEKEND = 'Weekend',
    WEEKDAY = 'Weekday',
}

class Intake extends BaseEntity {
    name: string;
    launchDate: Date;
    type: IntakeType;
    isOpened: boolean;
    applicationDeadline: Date;
}

export default Intake;
