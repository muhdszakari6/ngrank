import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorsReposComponent } from './contributors-repos.component';

describe('ContributorsReposComponent', () => {
  let component: ContributorsReposComponent;
  let fixture: ComponentFixture<ContributorsReposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributorsReposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorsReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
