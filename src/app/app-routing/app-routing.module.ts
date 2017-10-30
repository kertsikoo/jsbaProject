import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ImageListComponent } from '../images/image-list/image-list.component';
import { ImageDetailsComponent } from '../images/image-details/image-details.component';

const routes: Routes = [
  {
      path: '',
      component: ImageListComponent,
  },
  {
    path:'image-details',
    component: ImageDetailsComponent,
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
