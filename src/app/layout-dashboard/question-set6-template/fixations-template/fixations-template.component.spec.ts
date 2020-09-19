import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixationsTemplateComponent } from './fixations-template.component';

describe('FixationsTemplateComponent', () => {
  let component: FixationsTemplateComponent;
  let fixture: ComponentFixture<FixationsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixationsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixationsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
