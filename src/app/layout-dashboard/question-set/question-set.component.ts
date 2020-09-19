import { Component, OnInit, Input } from '@angular/core';
import { CountUpOptions } from 'countup.js';
import { QuestionService } from 'src/app/Service/question.service';
import { ClsQuestionSetStatusCode } from 'src/app/Model/question';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';

@Component({
  selector: 'app-question-set',
  templateUrl: './question-set.component.html',
  styleUrls: ['./question-set.component.css']
})
export class QuestionSetComponent implements OnInit {

  opts: CountUpOptions;
  @Input() CurrentTestId: number;
  LoadExamStatusCode : ClsQuestionSetStatusCode[];
  error : string;
  ErrorLog: HttpErrorResponse;
  TotalQuestion : number;
  NoOfQuestionComplete : number;
  ProgressSetId : number;
  constructor(private QuesSVC: QuestionService,
              private _ErrorHandlerService: ErrorHandlerService,
              private _router:Router) { }

  ngOnInit() {
    this.opts = {
      duration: 5,
      useEasing: false,
      useGrouping: false
    };
    this.loadExamStatusCode(this.CurrentTestId);
  }


  loadExamStatusCode(TestId) {
    this.QuesSVC.GetExamStatusCode(TestId).subscribe(
      data => {
        this.LoadExamStatusCode = Object.assign([], data.ExamStatusCode)
        this.TotalQuestion =data.NoOfQuestion;
        this.NoOfQuestionComplete =data.NoOfQuestionComplete;
        this.ProgressSetId = data.ProgressSetId;
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
