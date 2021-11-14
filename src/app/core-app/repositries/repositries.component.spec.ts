import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RepositriesComponent } from './repositries.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiGithubService } from 'src/app/services/api-github.service';
import { of } from 'rxjs';
import { testingConsts } from 'src/app/shared/consts/testingConsts';
import { By } from '@angular/platform-browser';

describe('RepositriesComponent', () => {
  let component: RepositriesComponent;
  let fixture: ComponentFixture<RepositriesComponent>;
  let mockGithubService

  beforeEach(async () => {

    mockGithubService = jasmine.createSpyObj('ApiGithubService', ['selectRepo'],
      {
        'selectedRepo$': of(testingConsts.repos[0]),
      },
    )
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ApiGithubService, useValue: mockGithubService },
      ],
      declarations: [RepositriesComponent],
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

  it('should get details of selected repo.', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('h2'))[1].nativeElement.textContent).toContain(testingConsts.repos[0].full_name)
  });

});

