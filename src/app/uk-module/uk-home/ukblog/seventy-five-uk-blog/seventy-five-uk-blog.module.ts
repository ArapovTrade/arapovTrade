import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventyFiveComponent } from './home-uk-blog-seventy-five/home-uk-blog-seventy-five.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogSeventyFiveComponent },
];

@NgModule({
  declarations: [HomeUkBlogSeventyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyFiveUkBlogModule {}
