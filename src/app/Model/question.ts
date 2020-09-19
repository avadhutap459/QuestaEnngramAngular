export class Question {
}
export class ClsQuestionModel {

    CurrentUserId: number;
    TestId: number;
    CurrentSetId: number;
    CurrentSetName: string;
    NextSetId?: number;
    NextTypeName: string;
    NextTypeId?: number;
    CurrentSetStatus: string;
    IsScordBoardDisplay: boolean;
    IsQuestionDisplay: boolean;
    TotalQuestion: number;
    CompletedQuestion: number;
    IsShowNextButton: boolean;
    IsShowSubmitButton: boolean;
    IsShowGoToNextSetButton: boolean;
    LastQuestionId: number;
    NextQuestion: number;
    PrevQuestion: number;
    lstQuestionModel: ClsQuestion[];
    ScoreBoard: ClsTypeModel[];
    IsTestComplete: boolean;
    lstSubType: QuestionSubType[];
    ScoreCardForSet6 : ClsSet6ScoreModel[];
    SubModuleId?:number;
}

export class ClsQuestion {
    TestQuestionId: number;
    QuestionId: number;
    Question: string;
    QuesId: string;
    TypeId?: number;
    ResponseTypeId?: number;
    ResponseValue?: number;
    lstQuestionRes: ClsQuestionResponse[];
    ImpactScore?: number;
    TestId?: number;
    Rating : number;
}

export class ClsQuestionResponse {
    ResponseId: number;
    ResponseText: string;
    Weight: number;
    SubTypeId:number;
    SubTypeName : string;
    ResponseNumber:number;
   
}

export class ClsTypeModel {
    TypeId: number;
    TypeName: string;
    Score: number;
    ColorCode: string;
}

export enum ResponseType {
    RadioButton,
    CheckBox
}

export class ClsQuestionSetStatusCode {
    SetId: number
    SetName: string;
    StatusCode: string;
    CompletePercentage: string;
}


export enum PageLoad {
    Question = "Question",
    Scoreboard = "Scoreboard",
    FinalQuestion = "FinalQuestion",
    FinalScoreboard = "FinalScoreboard"
}

export class QuestionSubType {
    SubTypeId: number;
    SubTypeName: string;
    TypeId: number
}

export class ClsSet6ScoreModel {
    SubModuleId :number
    SubModuleName :string
    PersonalityScore :number
    PresenceScore :number
}