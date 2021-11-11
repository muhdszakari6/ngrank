import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorsDetailComponent } from './contributors-detail.component';

describe('ContributorsDetailComponent', () => {
  let component: ContributorsDetailComponent;
  let fixture: ComponentFixture<ContributorsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributorsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
