import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixtyTwoComponent } from './home-ru-blog-sixty-two/home-ru-blog-sixty-two.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixtyTwoComponent }];

@NgModule({
  declarations: [HomeRuBlogSixtyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyTwoRuBlogModule {}
