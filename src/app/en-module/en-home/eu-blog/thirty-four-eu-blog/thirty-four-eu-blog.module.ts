import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtyFourComponent } from './home-eu-blog-thirty-four/home-eu-blog-thirty-four.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogThirtyFourComponent }];

@NgModule({
  declarations: [HomeEuBlogThirtyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyFourEuBlogModule {}
