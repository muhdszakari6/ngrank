import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EMPTY, Subscription, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ApiGithubService } from 'src/app/services/api-github.service';
import { UsersWithContributions } from 'src/model/github.model';

@Component({
  selector: 'app-contributors-list',
  templateUrl: './contributors-list.component.html',
  styleUrls: ['./contributors-list.component.scss']
})
export class ContributorsListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [" ", 'username', 'contributions', 'followers', 'public_repos', 'public_gists'];
  loading: boolean = true
  tableError: boolean = false
  innerHeight = window.innerHeight - 300
  users: Set<number> = new Set();
  miniLoading: boolean = false


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  list: Array<UsersWithContributions> = [];
  listData: MatTableDataSource<UsersWithContributions> = new MatTableDataSource<UsersWithContributions>([]);
  count: number = 0;
  filteredList: Array<UsersWithContributions> = [];
  finalList: Array<UsersWithContributions> = [];


  @ViewChild(MatSort) sort!: MatSort;
  githubSub: Subscription | undefined;

  constructor(
    private githubService: ApiGithubService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.loading = true
    this.miniLoading = true
    this.githubSub = this.githubService.finalUsers$.pipe(
      // take(30),
      catchError((err) => {
        
        this.loading = false
        this.tableError = true
        return EMPTY

      }),
    ).subscribe(
      res => {
        this.list = res
        this.loading = false
        this.tableError = false
        this.count = this.list.length
        this.listData = new MatTableDataSource(this.list)
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
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue
    filterValue = filterValue.toLowerCase();
    this.listData.filter = filterValue;
  }

  rowClicked(username: string) {
    this.router.navigate([`user/${username}`])
  }

  ngOnDestroy(): void {
    this.githubSub ? this.githubSub.unsubscribe() : null;
  }


}