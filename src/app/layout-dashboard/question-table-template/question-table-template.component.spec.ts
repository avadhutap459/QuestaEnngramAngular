import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTableTemplateComponent } from './question-table-template.component';

describe('QuestionTableTemplateComponent', () => {
  let component: QuestionTableTemplateComponent;
  let fixture: ComponentFixture<QuestionTableTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTableTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTableTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
