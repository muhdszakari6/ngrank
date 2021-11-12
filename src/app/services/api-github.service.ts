import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, forkJoin, from, merge, Observable, throwError } from 'rxjs';
import { APICONSTANTS } from './consts/APICONSTANTS';
import { catchError, concatMap, exhaustMap, filter, map, mergeMap, scan, share, shareReplay, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { AllRepos, ContributorData, Users, UsersWithContributions } from 'src/model/github.model';


@Injectable({
  providedIn: 'root'
})
export class ApiGithubService {

  users: Set<number> = new Set();
  contributorsList: Array<UsersWithContributions> = []

  private baseUrl: string = APICONSTANTS.base;
  private reposUrl: string = APICONSTANTS.reposUrl;
  private contributorSelectedSubject = new BehaviorSubject<string>('')
  private contributorSelectedAction$ = this.contributorSelectedSubject.asObservable()

  private contributorListSubject = new BehaviorSubject<Array<UsersWithContributions>>([])
  private contributorListAction$ = this.contributorListSubject.asObservable()


  private repoSelectedSubject = new BehaviorSubject<string>('')
  repoSelectedAction$ = this.repoSelectedSubject.asObservable()

  constructor(private http: HttpClient) {
  }


  repos$ = this.http.get<any>(this.baseUrl + this.reposUrl + `?per_page=${APICONSTANTS.pageSize}`, { observe: 'response' })
    .pipe(
      mergeMap(
        (response) => {
          let pageNumber = response.headers.get('link')!.split('=')[5]?.substring(0, 1)
          let array = Array.from(Array(+pageNumber).keys())
          return from(array).pipe(
            concatMap(
              (page: number) => {
                return this.http.get<AllRepos[]>(`${this.baseUrl}${this.reposUrl}?page=${page + 1}&per_page=${APICONSTANTS.pageSize}`).pipe(
                  catchError((err) => {
                    return this.errorHandler(err)
                  })
                )
              }
            ),


          )
        }
      ),
      shareReplay()
    )


  contributors$ = this.repos$
    .pipe(
      mergeMap((repos: AllRepos[]) => {
        let repos_fullname = repos.map((repo: AllRepos) => (repo?.full_name))
        return from(repos_fullname).pipe(

          mergeMap(
            (repo_fullname: string) => this.http.get<any>(`${this.baseUrl}/repos/${repo_fullname}/contributors?&per_page=${APICONSTANTS.pageSize}`, { observe: 'response' }).pipe(
              map((res) => {
                return res
              }),
              //one of the repos returns null, found out after hours of debugging
              filter(res => res !== null),
              catchError((err) => {
                return this.errorHandler(err)
              })
            )
          ),

        )
      }),
      // shareReplay(),
      catchError(err => this.errorHandler(err)),

    )


  contributorsPaginated$ = this.contributors$
    .pipe(
      // take(3),
      concatMap(
        (response) => {
          let requestUrl = response.url
          let array: Array<number> = []
          if (response.headers.get('link') === null) {
            let pageNumber = 1

            array = Array.from(Array(+pageNumber).keys())

          } else {
            let pageNumber = response.headers.get('link')!.split('=')[5]?.substring(0, 1)

            array = Array.from(Array(+pageNumber).keys())

          }


          return from(array).pipe(
            concatMap(
              (page: number) => {

                return this.http.get<any>(`${requestUrl}&page=${page + 1}`, { observe: 'response' }).pipe(
                  catchError((err) => {
                    return this.errorHandler(err)
                  })
                )
              }
            ),


          )
        }
      ),
      shareReplay(),

      catchError((err) => {
        return this.errorHandler(err)
      }),

    )


  users$ = this.contributorsPaginated$.pipe(
    concatMap(
      (contributors) => {

        let reducedContributors = contributors.body != null ? contributors.body : []
        return from([...reducedContributors]).pipe(

          filter((contributor) => {
            let newContributorIndex = this.contributorsList.findIndex(item => {   
              return contributor.login === item.login
            })

            if (newContributorIndex != -1) {
              let newContributor = {
                ...this.contributorsList[newContributorIndex],
                contributions: this.contributorsList[newContributorIndex].contributions + contributor.contributions
              }

              this.contributorsList.splice(newContributorIndex, 1, newContributor)

              return false
            }

            return true
          }),

          mergeMap((filteredContributors: ContributorData) => {


            return this.http.get<Users>(`${this.baseUrl}/users/${filteredContributors.login}`).pipe(

              map((item: Users) => {
                this.contributorsList.push({ ...item, contributions: filteredContributors.contributions })
                return { ...item, contributions: filteredContributors.contributions }
              }),
              catchError((err) => {
                return this.errorHandler(err)
              })
            )

          })
        )
      }
    ),
    shareReplay(1)

  )

  finalUsers$ = this.users$.pipe(
    map(item => {
      return this.contributorsList
    })
  )



  userDetails$ = this.contributorSelectedAction$.pipe(
    switchMap(
      (name: string) => {
        return this.http.get<Users>(
          `${this.baseUrl}/users/${name}`)
          .pipe(

            catchError(err => this.errorHandler(err))
          )
      }
    )

  )

  userRepos$ = this.contributorSelectedAction$.pipe(
    switchMap(
      (name: string) => {
        return this.http.get<any>(
          `${this.baseUrl}/users/${name}/repos`)
          .pipe(

            catchError(err => this.errorHandler(err))
          )
      }
    )

  )


  contributorsNgRepos$ = this.contributorsPaginated$.pipe(
    withLatestFrom(this.contributorSelectedAction$),
    filter((([contributorWithRepo, selectedContributors]) => {
      let body = contributorWithRepo.body
      return body?.find((item: ContributorData) => selectedContributors === item.login)
    })),
    map((([response, contributor]) => {
      return response.url?.split('/')[4] + "/" + response.url?.split('/')[5]
    })),
  )


  repoContributors$ = this.repoSelectedAction$.pipe(
    switchMap(
      (repo_fullname: string) => this.http.get<any>(`${this.baseUrl}/repos/angular/${repo_fullname}/contributors?&per_page=${APICONSTANTS.pageSize}`, { observe: 'response' }).pipe(
        map((res) => {
          return res
        }),
        filter(res => res !== null),
        catchError((err) => {
          return this.errorHandler(err)
        })
      )
    ),
  )

  repoContributorsPaginated$ = this.repoContributors$.pipe(
    concatMap(
      (response) => {
        let requestUrl = response.url
        let array: Array<number> = []
        if (response.headers.get('link') === null) {
          let pageNumber = 1

          array = Array.from(Array(+pageNumber).keys())

        } else {

          let pageNumber = response.headers.get('link')!.split('=')[5]?.substring(0, 1)

          array = Array.from(Array(+pageNumber).keys())

        }


        return from(array).pipe(
          concatMap(
            (page) => {

              return this.http.get<ContributorData[]>(`${requestUrl}&page=${page + 1}`).pipe(
                catchError((err) => {
                  return this.errorHandler(err)
                })
              )
            }
          ),


        )
      }
    ),
  )

  // repoContributorsUsers$ = this.repoContributorsPaginated$.pipe(
  //   mergeMap(
  //     (contributors) => {
  //       let reducedContributors = contributors.body != null ? contributors.body : []
  //       return from([...reducedContributors]).pipe(
  //         mergeMap((filteredContributors) => {
  //           return this.http.get<any>(`${this.baseUrl}/users/${filteredContributors.login}`).pipe(
  //             map((item: any) => {
  //               return { ...item }
  //             }),
  //             catchError((err) => {
  //               return this.errorHandler(err)
  //             })
  //           )
  //         })
  //       )
  //     }
  //   ),
  // )



  selectedRepo$ = this.repos$.pipe(
    withLatestFrom(this.repoSelectedAction$),
    filter((([repos, selectedRepo]) => {
      return repos.find((item: AllRepos) => item.name === selectedRepo) != null
    })),
    map(([repos, foundRepo]) => repos.find((item: AllRepos) => item.name === foundRepo))

  )



  selectContributor(name: string) {
    this.contributorSelectedSubject.next(name);
  }

  selectRepo(name: string) {
    this.repoSelectedSubject.next(name);
  }



  private errorHandler(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error?.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body?.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }



}
