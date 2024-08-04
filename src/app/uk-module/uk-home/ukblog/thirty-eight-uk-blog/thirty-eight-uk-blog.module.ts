import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirtyEightComponent } from './home-uk-blog-thirty-eight/home-uk-blog-thirty-eight.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogThirtyEightComponent },
];

@NgModule({
  declarations: [HomeUkBlogThirtyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyEightUkBlogModule {}
