import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventyFourComponent } from './home-uk-blog-seventy-four/home-uk-blog-seventy-four.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogSeventyFourComponent },
];

@NgModule({
  declarations: [HomeUkBlogSeventyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyFourUkBlogModule {}
