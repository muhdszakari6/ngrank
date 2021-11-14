import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiGithubService } from 'src/app/services/api-github.service';
import { testingConsts } from 'src/app/shared/consts/testingConsts';
import { SharedModule } from 'src/app/shared/shared.module';


import { ContributorsListComponent } from './contributors-list.component';

describe('ContributorsListComponent', () => {
  let component: ContributorsListComponent;
  let fixture: ComponentFixture<ContributorsListComponent>;
  let mockGithubService

  beforeEach(async () => {

    mockGithubService = jasmine.createSpyObj('ApiGithubService', [],
      {
        'finalUsers$': of([testingConsts.userDetails]),
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
      declarations: [ContributorsListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a row of emitted user.', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('td'))[1].nativeElement.textContent).toContain(testingConsts.userDetails.login)
  });


});
