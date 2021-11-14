import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiGithubService } from 'src/app/services/api-github.service';
import { testingConsts } from 'src/app/shared/consts/testingConsts';
import { SharedModule } from 'src/app/shared/shared.module';

import { RepoListComponent } from './repo-list.component';

describe('RepoListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;
  let mockGithubService

  beforeEach(async () => {

    mockGithubService = jasmine.createSpyObj('ApiGithubService', [],
      {
        'repoContributorsPaginated$': of(testingConsts.contributors),
        'userDetails$': of(testingConsts.userDetails),

      },
    )

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule

      ],
      declarations: [RepoListComponent],
      providers: [
        { provide: ApiGithubService, useValue: mockGithubService },
      ]

    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a row of emittted contributor ', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('td'))[1].nativeElement.textContent).toContain(`@${testingConsts.userDetails.login}`)
  });

});
