import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiGithubService } from 'src/app/services/api-github.service';
import { testingConsts } from 'src/app/shared/consts/testingConsts';
import { SharedModule } from 'src/app/shared/shared.module';

import { ContributorsReposComponent } from './contributors-repos.component';

describe('ContributorsReposComponent', () => {
  let component: ContributorsReposComponent;
  let fixture: ComponentFixture<ContributorsReposComponent>;
  let mockGithubService

  beforeEach(async () => {

    mockGithubService = jasmine.createSpyObj('ApiGithubService', [],
      {
        'contributorsNgRepos$': of(testingConsts.repos[0].full_name),
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
      providers: [
        { provide: ApiGithubService, useValue: mockGithubService },
      ],
      declarations: [ContributorsReposComponent]
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
  
  it('should create a row of emittted repo ', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('td'))[0].nativeElement.textContent).toContain(`${testingConsts.repos[0].full_name}`)
  });

  it('should get details of selected contributor.', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('h2'))[0].nativeElement.textContent).toContain(testingConsts.userDetails.name)
  });

});
