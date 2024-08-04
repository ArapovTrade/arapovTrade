import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtyFiveComponent } from './home-eu-blog-thirty-five/home-eu-blog-thirty-five.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogThirtyFiveComponent }];

@NgModule({
  declarations: [HomeEuBlogThirtyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyFiveEuBlogModule {}
