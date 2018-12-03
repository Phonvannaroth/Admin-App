import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReviewComponent } from './job-review.component';

describe('JobReviewComponent', () => {
  let component: JobReviewComponent;
  let fixture: ComponentFixture<JobReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
