import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlindspotTemplateComponent } from './blindspot-template.component';

describe('BlindspotTemplateComponent', () => {
  let component: BlindspotTemplateComponent;
  let fixture: ComponentFixture<BlindspotTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlindspotTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlindspotTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
