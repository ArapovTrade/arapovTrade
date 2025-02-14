import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventyEightComponent } from './home-uk-blog-seventy-eight/home-uk-blog-seventy-eight.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogSeventyEightComponent },
];

@NgModule({
  declarations: [HomeUkBlogSeventyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyEightUkBlogModule {}
