import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogThirteenComponent } from './home-en-blog-thirteen/home-en-blog-thirteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogThirteenComponent }];

@NgModule({
  declarations: [HomeEnBlogThirteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirteenEnBlogModule {}
