import { Component, OnInit, Input } from '@angular/core';
import { ClsQuestionModel, ClsQuestionResponse } from 'src/app/Model/question';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/Service/question.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { ModuleDialogComponent } from 'src/app/Other/module-dialog/module-dialog.component';

@Component({
  selector: 'app-question-drag-and-drop-template',
  templateUrl: './question-drag-and-drop-template.component.html',
  styleUrls: ['./question-drag-and-drop-template.component.css']
})
export class QuestionDragAndDropTemplateComponent implements OnInit {

  @Input() Question: ClsQuestionModel;
  loading = false;
  CurrentTestId: number; 
  QuestionResponse : ClsQuestionResponse[];
  error : string;
  ErrorLog: HttpErrorResponse;
  constructor(private QuesSVC: QuestionService,
              private _router: Router,
              private _ErrorHandlerService: ErrorHandlerService,
              public matDialog: MatDialog) { }

  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
  }
  
  drop(event: CdkDragDrop<string[]>,QuestionResponse : ClsQuestionResponse[]) {
    moveItemInArray(QuestionResponse, event.previousIndex, event.currentIndex);
  }

  GetSubTypeName(index : number) {
    var  SubTypeData = this.Question.lstSubType;
    let SubTypeName;
    var filteredObj = SubTypeData.find(function(item, i){
      if(i === index){
        SubTypeName = item.SubTypeName;
      }
    });
    return SubTypeName;
  }
  SaveQuestion(): void {
    let IsSuccess;
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
