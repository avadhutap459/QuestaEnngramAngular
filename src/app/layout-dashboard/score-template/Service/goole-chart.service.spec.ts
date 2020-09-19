import { TestBed } from '@angular/core/testing';

import { GooleChartService } from './goole-chart.service';

describe('GooleChartService', () => {
  let service: GooleChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GooleChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
