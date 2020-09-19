import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTestComponent } from './complete-test.component';

describe('CompleteTestComponent', () => {
  let component: CompleteTestComponent;
  let fixture: ComponentFixture<CompleteTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
