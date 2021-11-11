import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositriesComponent } from './repositries.component';

describe('RepositriesComponent', () => {
  let component: RepositriesComponent;
  let fixture: ComponentFixture<RepositriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
