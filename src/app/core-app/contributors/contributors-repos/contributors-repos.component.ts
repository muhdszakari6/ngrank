import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, EMPTY } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { ApiGithubService } from 'src/app/services/api-github.service';
import { contributorRepoModel } from 'src/model/github.model';



@Component({
  selector: 'app-contributors-repos',
  templateUrl: './contributors-repos.component.html',
  styleUrls: ['./contributors-repos.component.scss']
})
export class ContributorsReposComponent implements OnInit {
  displayedColumns: string[] = ['full_name',  ];
  loading: boolean = true
  tableError: boolean = false
  repos: Set<string> = new Set();
  innerHeight = window.innerHeight - 160

  errorMessage = null

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  list: Array<contributorRepoModel> = [];
  listData: MatTableDataSource<contributorRepoModel> = new MatTableDataSource<contributorRepoModel>([]);
  count: number = 0;


  @ViewChild(MatSort) sort!: MatSort;
  githubSub: Subscription | undefined;

  selectedContributors$ = this.githubService.userDetails$
  .pipe(
    catchError((err) => {
      this.errorMessage = err
      return EMPTY
    })
  )
  filteredList: Array<contributorRepoModel> = [];

  constructor(
    private githubService: ApiGithubService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.loading = true
    this.githubSub = this.githubService.contributorsNgRepos$.pipe(
      catchError((err) => {

        this.loading = false
        this.tableError = true
        return EMPTY

      }),
    ).subscribe(
      res => {
        let repoUrl = res

        this.list.push({full_name: repoUrl})
        this.loading = false
        this.tableError = false

        this.list.forEach(
          (el: contributorRepoModel) => {
            const duplicate = this.repos.has(el.full_name);
            this.repos.add(el.full_name);
            !duplicate ? this.filteredList.push(el) : null;
          })
       
        this.count = this.filteredList.length
        this.listData = new MatTableDataSource(this.filteredList)
        this.listData.paginator = this.paginator
        this.listData.sort = this.sort
      }, err => {
        this.loading = false
        this.tableError = true
      },
    )
  }
 


  applyFilter(filterValue: string) {
    filterValue = filterValue
    filterValue = filterValue.toLowerCase();
    this.listData.filter = filterValue;
  }

  rowClicked(repoUrl: string){
    let repo = repoUrl.split('/')[1]
    this.router.navigate([`repo/${repo}`])
  }

  ngOnDestroy(): void {
    this.githubSub ? this.githubSub.unsubscribe() : null; 
  }


}
