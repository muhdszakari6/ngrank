import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { ContributorsDetailComponent } from './contributors/contributors-detail/contributors-detail.component';
import { ContributorsComponent } from './contributors/contributors.component';
import { RepositriesComponent } from './repositries/repositries.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,

    children: [
      {
        path: '',
        component: ContributorsComponent,
      },
      {
        path: 'user/:username',
        component: ContributorsDetailComponent,
      }, 
      {
        path: 'repo/:repo',
        component: RepositriesComponent,
      }
    ]
  }, 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreAppRoutingModule { }
