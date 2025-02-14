import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventyFourComponent } from './home-en-blog-seventy-four/home-en-blog-seventy-four.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogSeventyFourComponent },
];

@NgModule({
  declarations: [HomeEnBlogSeventyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyFourEnBlogModule {}
