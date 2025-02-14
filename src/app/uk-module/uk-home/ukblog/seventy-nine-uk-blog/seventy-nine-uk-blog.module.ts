import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventyNineComponent } from './home-uk-blog-seventy-nine/home-uk-blog-seventy-nine.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogSeventyNineComponent },
];

@NgModule({
  declarations: [HomeUkBlogSeventyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyNineUkBlogModule {}
