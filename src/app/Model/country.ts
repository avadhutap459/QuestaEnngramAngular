export class Country {
}
export class CountryModel {
    countryId: number;
    countryname: string;
}

export class StateModel {
    stateId: number;
    countryId: number;
    statename: string;
}

export class QualificationModel {
    QualificationId: number;
    QualificationName: string;
}

export class ProfessionModel {
    ProfessionId: number;
    ProfessionName: string;
}

export class AgeModel {
    AgeId: number;
    AgeName: string;
}
export class GenderModel {
    GenderId: number;
    GenderName: string;
}
export class MaritalStatusModel {
    MaritalId: number;
    MaritalName: string;
}
export class EmployeeStatusModel {
    EmploymentId: number;
    EmploymentName: string;
}
export class IndustryModel {
    IndustryId: number;
    IndustryName: string;
}