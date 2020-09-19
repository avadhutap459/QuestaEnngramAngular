import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClsQuestionModel, ClsQuestion } from 'src/app/Model/question';
import { QuestionSetComponent } from '../question-set/question-set.component';
import { NgForm } from '@angular/forms';
import { QuestionService } from 'src/app/Service/question.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { ModuleDialogComponent } from 'src/app/Other/module-dialog/module-dialog.component';

@Component({
  selector: 'app-question-table-template',
  templateUrl: './question-table-template.component.html',
  styleUrls: ['./question-table-template.component.css']
})
export class QuestionTableTemplateComponent implements OnInit {

  @Input() Question: ClsQuestionModel;
  loading = false;
  CurrentTestId: number;
  error : string;
  ErrorLog: HttpErrorResponse;
  TxnQuestionResponseText : string;
  TxnQuestionResponseId : number;
  constructor(private QuesSVC: QuestionService,
              private _router: Router,
              private _ErrorHandlerService: ErrorHandlerService,
              public matDialog: MatDialog) { }

  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
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
  SaveQuestion(QuestionForm: NgForm): void {
    let IsSuccess;
    let ExamStatus;
    this.loading = true;
    this.QuesSVC.SubmitCurrentSetofQuestionModel(this.Question).subscribe(
      data => {
        IsSuccess = data.isSuccess;
        if (IsSuccess) {
          this.Question = Object.assign({}, data.QuestionModel)
          // this.CurrentTestId = this.Question.TestId;
          this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          }
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigate(['/QuestionSeries', this.Question.TestId]);

          this.loading = false;
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
}
