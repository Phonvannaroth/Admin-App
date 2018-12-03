import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePostingComponent } from './make-posting.component';

describe('MakePostingComponent', () => {
  let component: MakePostingComponent;
  let fixture: ComponentFixture<MakePostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakePostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
