import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEighteenComponent } from './home-en-blog-eighteen/home-en-blog-eighteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEighteenComponent }];

@NgModule({
  declarations: [HomeEnBlogEighteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EighteenEnBlogModule {}
