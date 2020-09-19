import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClsQuestionModel, ClsQuestion, ClsQuestionResponse } from 'src/app/Model/question';
import { QuestionSetComponent } from '../../question-set/question-set.component';
import { QuestionService } from 'src/app/Service/question.service';
import { Router } from '@angular/router';
import { Options, LabelType, CustomStepDefinition } from '@m0t0r/ngx-slider';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';

@Component({
  selector: 'app-fixations-template',
  templateUrl: './fixations-template.component.html',
  styleUrls: ['./fixations-template.component.css']
})
export class FixationsTemplateComponent implements OnInit {

  @Input() Question: ClsQuestionModel;
  loading = false;
  CurrentTestId: number;
  @ViewChild(QuestionSetComponent, { static: false }) childC: QuestionSetComponent;
  error : string;
  ErrorLog: HttpErrorResponse;
  TxnQuestionResponseText : string;
  TxnQuestionResponseId : number;
  QuestionResponse : ClsQuestionResponse[];
  constructor(private QuesSVC: QuestionService,
              private _router: Router,
              private _ErrorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
  }

  alphabet: string = 'Left 4,Left 3,Left 2,Left 1,0,Right 1,Right 2,Right 3,Right 4';
  value: number = this.letterToIndex('0');
  value1: number = this.letterToIndex('0');
  options: Options = {
    stepsArray: this.alphabet.split(',').map((letter: string): CustomStepDefinition => {
      return { value: this.letterToIndex(letter) };
    }),
    translate: (value: number, label: LabelType): string => {
      
      return this.indexToLetter(value);
    },
    showTicks: true,
    showTicksValues: true
  };

  indexToLetter(index: number): string {
    var Idx;
    var posNum ;
    posNum = (index < 0) ? index * -1 : index;
    if(index > 0){
      Idx = 'Left ' +index;
    } else if(index  === 0){
      Idx = '0';
    } else {
      Idx = 'Right '+index;
    }
   // var Idx = this.alphabet[index];
    //var arr = Idx.split(" ");
    return posNum;
  }

  letterToIndex(letter: string): number {
    var position;
    if( letter === 'Left 4'){
      position = -4;
    }
    else if( letter === 'Left 4'){
      position = -4;
    }
    else if( letter === 'Left 3'){
      position = -3;
    }
    else if( letter === 'Left 2'){
      position = -2;
    }
    else if( letter === 'Left 1'){
      position = -1;
    }
    else if( letter === '0'){
      position = 0;
    }
    else if( letter === 'Right 1'){
      position = 1;
    }
    else if( letter === 'Right 2'){
      position = 2;
    }
    else if( letter === 'Right 3'){
      position = 3;
    }
    else if( letter === 'Right 4'){
      position = 4;
    }
   // let di = this.alphabet.indexOf(letter);
    return position;
  }

  SaveQuestion(){
    let IsSuccess;
    this.loading = true;
    this.QuesSVC.SaveLoadNextSubModule(this.Question).subscribe(
      data => {
        IsSuccess = data.isSucess;
        if (IsSuccess) {
          this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          }
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigate(['/QuestionSeries', this.Question.TestId]);
        }
      },
      error =>{
        if (error.status !== 500) {
          this.ErrorLog = error;
          this._ErrorHandlerService.SaveErrorLog(this.ErrorLog).subscribe(
            data => {
              this._router.navigate(['/ErrorPage', this.CurrentTestId]);
            },
            error => { }
          )
        } else {
          this._router.navigate(['/ErrorPage', this.CurrentTestId]);
        }
      }
    );
  }
  valueChange(lstQuestionModel: ClsQuestion){
    this.QuestionResponse = lstQuestionModel.lstQuestionRes;
    if(lstQuestionModel.Rating < 0){
      lstQuestionModel.ResponseValue = this.QuestionResponse[0].ResponseId;
    }else if(lstQuestionModel.Rating > 0){
      lstQuestionModel.ResponseValue = this.QuestionResponse[1].ResponseId;
    }else if(lstQuestionModel.Rating == 0){
      lstQuestionModel.ResponseValue = null;
    }
  }

  RetrunQuestionResponseText(lstQuestion: ClsQuestion,Index : number) : string{
    let lstQuestionResponse = lstQuestion.lstQuestionRes;
    this.TxnQuestionResponseText = lstQuestionResponse[Index].ResponseText;
    return this.TxnQuestionResponseText;
  }
  RetrunQuestionResponseId(lstQuestion: ClsQuestion,Index : number) : number{
    let lstQuestionResponse = lstQuestion.lstQuestionRes;
    this.TxnQuestionResponseId = lstQuestionResponse[Index].ResponseId;
    return this.TxnQuestionResponseId;
  }
}
