import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventyFiveComponent } from './home-ru-blog-seventy-five/home-ru-blog-seventy-five.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogSeventyFiveComponent },
];

@NgModule({
  declarations: [HomeRuBlogSeventyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyFiveRuBlogModule {}
