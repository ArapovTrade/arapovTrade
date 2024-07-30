import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwentyNineComponent } from './home-ru-blog-twenty-nine/home-ru-blog-twenty-nine.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogTwentyNineComponent }];

@NgModule({
  declarations: [HomeRuBlogTwentyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyNineRuBlogModule {}
