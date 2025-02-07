import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixtyNineComponent } from './home-ru-blog-sixty-nine/home-ru-blog-sixty-nine.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixtyNineComponent }];

@NgModule({
  declarations: [HomeRuBlogSixtyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyNineRuBlogModule {}
