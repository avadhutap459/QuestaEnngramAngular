import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateRegFormComponent } from './candidate-reg-form.component';

describe('CandidateRegFormComponent', () => {
  let component: CandidateRegFormComponent;
  let fixture: ComponentFixture<CandidateRegFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateRegFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateRegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
