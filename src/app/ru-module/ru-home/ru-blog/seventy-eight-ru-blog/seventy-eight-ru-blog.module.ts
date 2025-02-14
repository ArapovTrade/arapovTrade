import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventyEightComponent } from './home-ru-blog-seventy-eight/home-ru-blog-seventy-eight.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogSeventyEightComponent },
];

@NgModule({
  declarations: [HomeRuBlogSeventyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyEightRuBlogModule {}
