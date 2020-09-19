import { Component, OnInit, Input } from '@angular/core';
import { ClsQuestionModel } from 'src/app/Model/question';

@Component({
  selector: 'app-question-set6-template',
  templateUrl: './question-set6-template.component.html',
  styleUrls: ['./question-set6-template.component.css']
})
export class QuestionSet6TemplateComponent implements OnInit {

  @Input() Question: ClsQuestionModel;
  constructor() { }

  ngOnInit(): void {
  }

}
