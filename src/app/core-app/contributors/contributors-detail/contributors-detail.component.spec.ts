import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ContributorsDetailComponent } from './contributors-detail.component';
import { of } from 'rxjs';
import { testingConsts } from 'src/app/shared/consts/testingConsts';
import { ApiGithubService } from 'src/app/services/api-github.service';
import { By } from '@angular/platform-browser';

describe('ContributorsDetailComponent', () => {
  let component: ContributorsDetailComponent;
  let fixture: ComponentFixture<ContributorsDetailComponent>;
  let mockGithubService

  beforeEach(async () => {

    mockGithubService = jasmine.createSpyObj('ApiGithubService', ['selectContributor'],
      {
        'userDetails$': of(testingConsts.contributors[0]),
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
  it('should get details of selected contributor.', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('h2'))[1].nativeElement.textContent).toContain(testingConsts.contributors[0].login)
  });


});
