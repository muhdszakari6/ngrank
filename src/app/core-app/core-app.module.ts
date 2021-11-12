import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreAppRoutingModule } from './core-app-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ContributorsComponent } from './contributors/contributors.component';
import { ContributorsDetailComponent } from './contributors/contributors-detail/contributors-detail.component';
import { ContributorsReposComponent } from './contributors/contributors-repos/contributors-repos.component';
import { ContributorsListComponent } from './contributors/contributors-list/contributors-list.component';
import { ContributorsGridComponent } from './contributors/contributors-grid/contributors-grid.component';
import { BaseComponent } from './base/base.component';
import { HeaderComponent } from './base/header/header.component';
import { RepositriesComponent } from './repositries/repositries.component';
import { RepoDetailsComponent } from './repositries/repo-details/repo-details.component';
import { RepoListComponent } from './repositries/repo-list/repo-list.component';
import { MobileNavComponent } from './base/mobile-nav/mobile-nav.component';



@NgModule({
  declarations: [
    ContributorsComponent,
    ContributorsDetailComponent, 
    ContributorsReposComponent,
    ContributorsListComponent,
    BaseComponent,
    HeaderComponent,
    ContributorsGridComponent,
    RepositriesComponent,
    RepoDetailsComponent,
    RepoListComponent,
    MobileNavComponent,
    

  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreAppRoutingModule
  ]
})
export class CoreAppModule { }
