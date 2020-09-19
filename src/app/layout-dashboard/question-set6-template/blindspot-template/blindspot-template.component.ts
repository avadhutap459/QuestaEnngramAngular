import { Component, OnInit, Input } from '@angular/core';
import { ClsQuestionModel } from 'src/app/Model/question';
import { QuestionService } from 'src/app/Service/question.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { ModuleDialogComponent } from 'src/app/Other/module-dialog/module-dialog.component';

@Component({
  selector: 'app-blindspot-template',
  templateUrl: './blindspot-template.component.html',
  styleUrls: ['./blindspot-template.component.css']
})
export class BlindspotTemplateComponent implements OnInit {

  @Input() Question: ClsQuestionModel;
  loading = false;
  CurrentTestId: number;
  error : string;
  ErrorLog: HttpErrorResponse;
  constructor(private QuesSVC: QuestionService,
              private _router: Router,
              private _ErrorHandlerService: ErrorHandlerService,
              public matDialog: MatDialog) { }

  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
  }

  SaveAndNextSubModule() {
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
}
