import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtyOneComponent } from './home-eu-blog-thirty-one/home-eu-blog-thirty-one.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogThirtyOneComponent }];

@NgModule({
  declarations: [HomeEuBlogThirtyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyOneEuBlogModule {}
