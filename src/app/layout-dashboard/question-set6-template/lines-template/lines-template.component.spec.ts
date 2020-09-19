import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesTemplateComponent } from './lines-template.component';

describe('LinesTemplateComponent', () => {
  let component: LinesTemplateComponent;
  let fixture: ComponentFixture<LinesTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinesTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
