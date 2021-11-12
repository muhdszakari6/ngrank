import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { materials } from './angular-material/material-module';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { ErrorStateComponent } from './error-state/error-state.component';
import { MiniLoaderComponent } from './mini-loader/mini-loader.component';



@NgModule({
  declarations: [

    PageLoaderComponent, EmptyStateComponent, ErrorStateComponent, MiniLoaderComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...materials
  ],

  entryComponents: [

  ],


  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PageLoaderComponent,
    HttpClientModule,
    EmptyStateComponent, ErrorStateComponent, MiniLoaderComponent,
    ...materials

  ],
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule
    };
  }
}