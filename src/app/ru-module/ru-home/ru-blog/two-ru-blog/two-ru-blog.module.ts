import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwoComponent } from './home-ru-blog-two/home-ru-blog-two.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogTwoComponent }];

@NgModule({
  declarations: [HomeRuBlogTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwoRuBlogModule {}
