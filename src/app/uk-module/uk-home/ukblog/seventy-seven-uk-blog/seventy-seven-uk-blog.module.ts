import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventySevenComponent } from './home-uk-blog-seventy-seven/home-uk-blog-seventy-seven.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogSeventySevenComponent },
];

@NgModule({
  declarations: [HomeUkBlogSeventySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventySevenUkBlogModule {}
