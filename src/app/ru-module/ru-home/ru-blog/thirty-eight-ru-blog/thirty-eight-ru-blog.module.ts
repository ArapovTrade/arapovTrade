import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThirtyEightComponent } from './home-ru-blog-thirty-eight/home-ru-blog-thirty-eight.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogThirtyEightComponent },
];

@NgModule({
  declarations: [HomeRuBlogThirtyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyEightRuBlogModule {}
