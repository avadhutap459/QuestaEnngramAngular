import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClsQuestionModel } from 'src/app/Model/question';
import { QuestionService } from 'src/app/Service/question.service';
import { QuestionSetComponent } from 'src/app/layout-dashboard/question-set/question-set.component';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { ModuleDialogComponent } from 'src/app/Other/module-dialog/module-dialog.component';

@Component({
  selector: 'app-question-template',
  templateUrl: './question-template.component.html',
  styleUrls: ['./question-template.component.css']
})
export class QuestionTemplateComponent implements OnInit {

  @Input() Question: ClsQuestionModel;
  loading = false;
  CurrentTestId: number;
  @ViewChild(QuestionSetComponent, { static: false }) childC: QuestionSetComponent;
  error : string;
  ErrorLog: HttpErrorResponse;
  constructor(private QuesSVC: QuestionService,
    private _router: Router,
    private _ErrorHandlerService: ErrorHandlerService,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
  }

  NextAndSaveQuestion() {
    let IsSuccess;
    this.loading = true;
    this.QuesSVC.SaveLoadNextQuestionModel(this.Question).subscribe(
      data => {
        IsSuccess = data.isSucess;
        if (IsSuccess) {
          this.Question = Object.assign({}, data.QuestionModel)
          this.CurrentTestId = this.Question.TestId;
          this.childC.ngOnInit();
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
          this._router.navigate(['/ErrorPage',  this.CurrentTestId]);
        }
      }
    );

  }
  saveQuestion() {
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
