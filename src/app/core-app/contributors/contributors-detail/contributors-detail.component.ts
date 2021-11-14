import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { catchError,  } from 'rxjs/operators';
import { ApiGithubService } from 'src/app/services/api-github.service';

@Component({
  selector: 'app-contributors-detail',
  templateUrl: './contributors-detail.component.html',
  styleUrls: ['./contributors-detail.component.scss']
})
export class ContributorsDetailComponent implements OnInit, OnDestroy{
  errorMessage: string | null = null;
  routerSub: Subscription;

  selectedContributors$ = this.githubService.userDetails$
    .pipe(
      catchError((err) => {
        this.errorMessage = err
        return EMPTY
      })
    )

  constructor(
    private githubService: ApiGithubService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.routerSub = this.route.params.subscribe(
      res => {
        this.githubService.selectContributor(res.username)
      }
    )
  }



  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  
    this.routerSub.unsubscribe()
  }

  goBack(){
    this.location.back()
  }


}
