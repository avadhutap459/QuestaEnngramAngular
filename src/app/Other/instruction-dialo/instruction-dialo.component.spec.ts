import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionDialoComponent } from './instruction-dialo.component';

describe('InstructionDialoComponent', () => {
  let component: InstructionDialoComponent;
  let fixture: ComponentFixture<InstructionDialoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionDialoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionDialoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
