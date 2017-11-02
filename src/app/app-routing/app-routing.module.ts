import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ImageListComponent } from '../images/image-list/image-list.component';
import { ImageDetailsComponent } from '../images/image-details/image-details.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  {
      path: '',
      component: DashboardComponent,
  },
  {
    path: 'image-list',
    component: ImageListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
