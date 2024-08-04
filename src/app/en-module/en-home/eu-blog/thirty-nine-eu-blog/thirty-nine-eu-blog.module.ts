import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtyNineComponent } from './home-eu-blog-thirty-nine/home-eu-blog-thirty-nine.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogThirtyNineComponent }];

@NgModule({
  declarations: [HomeEuBlogThirtyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyNineEuBlogModule {}
