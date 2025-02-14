import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventyFourComponent } from './home-ru-blog-seventy-four/home-ru-blog-seventy-four.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogSeventyFourComponent },
];

@NgModule({
  declarations: [HomeRuBlogSeventyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyFourRuBlogModule {}
