import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OTPDialogComponent } from './otpdialog.component';

describe('OTPDialogComponent', () => {
  let component: OTPDialogComponent;
  let fixture: ComponentFixture<OTPDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OTPDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OTPDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
