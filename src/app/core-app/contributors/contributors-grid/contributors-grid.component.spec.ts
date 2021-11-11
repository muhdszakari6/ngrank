import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorsGridComponent } from './contributors-grid.component';

describe('ContributorsGridComponent', () => {
  let component: ContributorsGridComponent;
  let fixture: ComponentFixture<ContributorsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributorsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
