import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiGithubService } from 'src/app/services/api-github.service';

@Component({
  selector: 'app-repositries',
  templateUrl: './repositries.component.html',
  styleUrls: ['./repositries.component.scss']
})
export class RepositriesComponent implements OnInit, OnDestroy {
  errorMessage: string | null = null;

  selectedRepo$ = this.githubService.selectedRepo$
  routerSub: Subscription;


  constructor(
    private githubService: ApiGithubService,
    private route: ActivatedRoute,
    private location: Location

  ) {
    this.routerSub = this.route.params.subscribe(
      res => {
        this.githubService.selectRepo(res.repo)
      }
    )
  }



  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe()
  }

  goBack() {
    this.location.back()
  }


}
