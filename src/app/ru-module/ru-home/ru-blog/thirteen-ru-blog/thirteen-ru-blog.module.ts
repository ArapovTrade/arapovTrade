import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThirteenComponent } from './home-ru-blog-thirteen/home-ru-blog-thirteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogThirteenComponent }];

@NgModule({
  declarations: [HomeRuBlogThirteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirteenRuBlogModule {}
