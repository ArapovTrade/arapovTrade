import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixteenComponent } from './home-ru-blog-sixteen/home-ru-blog-sixteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixteenComponent }];

@NgModule({
  declarations: [HomeRuBlogSixteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixteenRuBlogModule {}
