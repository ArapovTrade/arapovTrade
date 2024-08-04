import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtySevenComponent } from './home-eu-blog-thirty-seven/home-eu-blog-thirty-seven.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEuBlogThirtySevenComponent },
];

@NgModule({
  declarations: [HomeEuBlogThirtySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtySevenEuBlogModule {}
