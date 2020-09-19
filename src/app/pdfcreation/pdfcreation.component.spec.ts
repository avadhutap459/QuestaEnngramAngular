import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PDFCreationComponent } from './pdfcreation.component';

describe('PDFCreationComponent', () => {
  let component: PDFCreationComponent;
  let fixture: ComponentFixture<PDFCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PDFCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PDFCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
