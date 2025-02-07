import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixtyEightComponent } from './home-ru-blog-sixty-eight/home-ru-blog-sixty-eight.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixtyEightComponent }];

@NgModule({
  declarations: [HomeRuBlogSixtyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyEightRuBlogModule {}
