import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwentySevenComponent } from './home-ru-blog-twenty-seven/home-ru-blog-twenty-seven.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogTwentySevenComponent },
];

@NgModule({
  declarations: [HomeRuBlogTwentySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentySevenRuBlogModule {}
