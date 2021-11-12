import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, EMPTY } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ApiGithubService } from 'src/app/services/api-github.service';
import { ContributorData } from 'src/model/github.model';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {

  displayedColumns: string[] = [" ", 'username', 'contributions'];
  loading: boolean = true
  miniLoading: boolean = true

  tableError: boolean = false
  repos: Set<string> = new Set();
  innerHeight = window.innerHeight - 160

  errorMessage = null

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  list: Array<Array<ContributorData>> = [];
  listData: MatTableDataSource<ContributorData> = new MatTableDataSource<ContributorData>([]);
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
  filteredList:  Array<ContributorData> = [];

  constructor(
    private githubService: ApiGithubService,
    private router: Router, 
    private _liveAnnouncer: LiveAnnouncer, 

  ) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.loading = true
    this.miniLoading = true
    this.githubSub = this.githubService.repoContributorsPaginated$.pipe(
      catchError((err) => {
        this.loading = false
        this.tableError = true
        return EMPTY

      }),
    ).subscribe(
      res => {
        let repoUrl = res
        console.log(res)
        this.list.push(res)
        this.filteredList = this.list.reduce((acc, curr) => acc.concat(curr), [])
        this.loading = false
        this.tableError = false
        this.count = this.filteredList.length
        this.listData = new MatTableDataSource(this.filteredList)
        this.listData.paginator = this.paginator
        this.listData.sort = this.sort
      }, err => {
        this.loading = false
        this.tableError = true
      },
      () => {
        this.miniLoading = false 
      }
    )
  }
 


  applyFilter(filterValue: string) {
    filterValue = filterValue
    filterValue = filterValue.toLowerCase();
    this.listData.filter = filterValue;
  }

  rowClicked(username: string){
    this.router.navigate([`user/${username}`])
  }


  ngOnDestroy(): void {
    this.githubSub ? this.githubSub.unsubscribe() : null; 
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }



}
