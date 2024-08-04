import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtyEightComponent } from './home-eu-blog-thirty-eight/home-eu-blog-thirty-eight.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEuBlogThirtyEightComponent },
];

@NgModule({
  declarations: [HomeEuBlogThirtyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyEightEuBlogModule {}
