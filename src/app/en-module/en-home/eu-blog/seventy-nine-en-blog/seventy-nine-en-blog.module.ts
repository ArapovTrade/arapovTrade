import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventyNineComponent } from './home-en-blog-seventy-nine/home-en-blog-seventy-nine.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogSeventyNineComponent },
];

@NgModule({
  declarations: [HomeEnBlogSeventyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyNineEnBlogModule {}
