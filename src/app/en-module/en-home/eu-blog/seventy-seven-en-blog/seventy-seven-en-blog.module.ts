import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventySevenComponent } from './home-en-blog-seventy-seven/home-en-blog-seventy-seven.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogSeventySevenComponent },
];

@NgModule({
  declarations: [HomeEnBlogSeventySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventySevenEnBlogModule {}
