import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiGithubService } from 'src/app/services/api-github.service';

@Component({
  selector: 'app-repositries',
  templateUrl: './repositries.component.html',
  styleUrls: ['./repositries.component.scss']
})
export class RepositriesComponent implements OnInit {
  errorMessage: string | null = null;

  selectedRepo$ = this.githubService.selectedRepo$

  constructor(
    private githubService: ApiGithubService,
    private route: ActivatedRoute,
    private location: Location

  ) {
    this.route.params.subscribe(
      res => {
        console.log(res)
        this.githubService.selectRepo(res.repo)
      }
    )
  }



  ngOnInit(): void {
  }

  
  goBack(){
    this.location.back()
  }


}
