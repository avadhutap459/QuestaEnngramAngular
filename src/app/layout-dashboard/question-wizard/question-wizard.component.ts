import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { QuestionService } from 'src/app/Service/question.service';
import { ClsQuestionModel } from 'src/app/Model/question';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-question-wizard',
  templateUrl: './question-wizard.component.html',
  styleUrls: ['./question-wizard.component.css']
})
export class QuestionWizardComponent implements OnInit {
  userClaim: any;
  SessionTestId: number;
  CurrentTestId: number;
  CurrentSetId: number;
  Question: ClsQuestionModel;
  IsQuestionDisplay: boolean;
  IsTestComplete: boolean;
  IsScordBoardDisplay: boolean;
  error: string;
  ErrorLog: HttpErrorResponse;
  constructor(private _route: ActivatedRoute,
    private QuesSVC: QuestionService,
    private _router: Router,
    private _ErrorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.userClaim = Object.assign({}, this._route.snapshot.data['list']);
    this.SessionTestId = this.userClaim.userAuth.TestId;

    this._route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('Testid'));
      this.CurrentTestId = id;
      if (this.CurrentTestId !== this.SessionTestId) {
        this._router.navigate(['/QuestionSeries', this.SessionTestId]);
      }
      this.CurrentTestId = this.SessionTestId;
      this.CurrentSetId = this.userClaim.userAuth.SetId;
    });
    this.loadQuestionModel(this.CurrentTestId, this.CurrentSetId);
  }


  loadQuestionModel(TestId, SetId) {

    this.QuesSVC.LoadQuestionModel(TestId, SetId).subscribe(
      data => {
        this.Question = Object.assign({}, data.QuestionModel)
        this.IsQuestionDisplay = this.Question.IsQuestionDisplay;
        this.IsTestComplete = this.Question.IsTestComplete;
        this.IsScordBoardDisplay = this.Question.IsScordBoardDisplay
      },
      error => {
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


}
