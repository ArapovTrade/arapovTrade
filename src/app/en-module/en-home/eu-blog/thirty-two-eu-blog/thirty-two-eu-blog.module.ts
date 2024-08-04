import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtyTwoComponent } from './home-eu-blog-thirty-two/home-eu-blog-thirty-two.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogThirtyTwoComponent }];

@NgModule({
  declarations: [HomeEuBlogThirtyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyTwoEuBlogModule {}
