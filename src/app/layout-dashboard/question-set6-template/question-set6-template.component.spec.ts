import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSet6TemplateComponent } from './question-set6-template.component';

describe('QuestionSet6TemplateComponent', () => {
  let component: QuestionSet6TemplateComponent;
  let fixture: ComponentFixture<QuestionSet6TemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSet6TemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSet6TemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
