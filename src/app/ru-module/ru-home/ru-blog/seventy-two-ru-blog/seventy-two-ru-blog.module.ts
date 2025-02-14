import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventyTwoComponent } from './home-ru-blog-seventy-two/home-ru-blog-seventy-two.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSeventyTwoComponent }];

@NgModule({
  declarations: [HomeRuBlogSeventyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyTwoRuBlogModule {}
