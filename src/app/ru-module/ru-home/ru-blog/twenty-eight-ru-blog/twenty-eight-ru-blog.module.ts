import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwentyEightComponent } from './home-ru-blog-twenty-eight/home-ru-blog-twenty-eight.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogTwentyEightComponent },
];

@NgModule({
  declarations: [HomeRuBlogTwentyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyEightRuBlogModule {}
