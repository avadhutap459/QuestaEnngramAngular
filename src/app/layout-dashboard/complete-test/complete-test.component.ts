import { Component, OnInit, Input } from '@angular/core';
import { ClsQuestionModel } from 'src/app/Model/question';

@Component({
  selector: 'app-complete-test',
  templateUrl: './complete-test.component.html',
  styleUrls: ['./complete-test.component.css']
})
export class CompleteTestComponent implements OnInit {

  @Input() Question: ClsQuestionModel;
  CurrentTestId: number;
  constructor() { }

  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
  }

}
