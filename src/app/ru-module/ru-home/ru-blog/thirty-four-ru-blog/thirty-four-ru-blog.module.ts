import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThirtyFourComponent } from './home-ru-blog-thirty-four/home-ru-blog-thirty-four.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogThirtyFourComponent }];

@NgModule({
  declarations: [HomeRuBlogThirtyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyFourRuBlogModule {}
