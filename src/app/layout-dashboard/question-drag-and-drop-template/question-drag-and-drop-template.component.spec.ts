import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDragAndDropTemplateComponent } from './question-drag-and-drop-template.component';

describe('QuestionDragAndDropTemplateComponent', () => {
  let component: QuestionDragAndDropTemplateComponent;
  let fixture: ComponentFixture<QuestionDragAndDropTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDragAndDropTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDragAndDropTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
