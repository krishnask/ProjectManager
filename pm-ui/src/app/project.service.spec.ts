import { TestBed } from '@angular/core/testing';
import {OrderPipe} from 'ngx-order-pipe';
import { ProjectService } from './project.service';
import{HttpClientModule, HttpErrorResponse} from '@angular/common/http'

describe('ProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule],
    declarations: [ OrderPipe ]
  }));

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });
});
