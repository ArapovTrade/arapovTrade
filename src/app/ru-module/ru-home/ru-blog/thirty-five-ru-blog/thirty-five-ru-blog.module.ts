import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThirtyFiveComponent } from './home-ru-blog-thirty-five/home-ru-blog-thirty-five.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogThirtyFiveComponent }];

@NgModule({
  declarations: [HomeRuBlogThirtyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyFiveRuBlogModule {}
