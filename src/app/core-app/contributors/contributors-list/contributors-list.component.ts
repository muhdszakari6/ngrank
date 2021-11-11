import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
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
export class ContributorsListComponent implements OnInit , OnDestroy{
  displayedColumns: string[] = [" ", 'username', 'contributions', 'followers', 'public_repos', 'public_gists'];
  loading: boolean = true
  tableError: boolean = false
  innerHeight = window.innerHeight - 260
  users: Set<number> = new Set();


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
    this.githubSub = this.githubService.users$.pipe(
      // take(30),
      catchError((err) => {
        //Catches and handle error state
        //Still allows observable stream to continue emitting
        //So error state might be recovered
        this.loading = false
        this.tableError = true
        return EMPTY

      }),
    ).subscribe(
      res => {
        this.list.push(res)
        this.loading = false
        this.tableError = false
        this.list.forEach(
          (el: UsersWithContributions) => {
            const duplicate = this.users.has(el.id);
            this.users.add(el.id);
            !duplicate ? this.filteredList.push(el) : null;
          })

        this.filteredList = this.filteredList.map((filteredContributor: UsersWithContributions) => {
          let duplicates = this.list.filter(
            (unfilteredContributor: UsersWithContributions) => filteredContributor.id === unfilteredContributor.id
          )
          let contributions = 0
          duplicates.forEach((duplicate: UsersWithContributions) => {
            contributions += duplicate.contributions;
          });
          return { ...filteredContributor, contributions }

        });

     
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
  announceSortChange(sortState: Sort) {
    console.log(sortState)
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

  rowClicked(username: string){
    this.router.navigate([`user/${username}`])
  }

  ngOnDestroy(): void {
    this.githubSub ? this.githubSub.unsubscribe() : null; 
    console.log(this.githubSub?.closed)
  }


}