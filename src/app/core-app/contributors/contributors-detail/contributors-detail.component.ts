import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiGithubService } from 'src/app/services/api-github.service';

@Component({
  selector: 'app-contributors-detail',
  templateUrl: './contributors-detail.component.html',
  styleUrls: ['./contributors-detail.component.scss']
})
export class ContributorsDetailComponent implements OnInit {
  errorMessage: string | null = null;

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
    this.route.params.subscribe(
      res => {
        this.githubService.selectContributor(res.username)
      }
    )
  }



  ngOnInit(): void {

  }

  goBack(){
    this.location.back()
  }


}
