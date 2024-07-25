import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwentyComponent } from './home-ru-blog-twenty/home-ru-blog-twenty.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogTwentyComponent }];

@NgModule({
  declarations: [HomeRuBlogTwentyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyRuBlogModule {}
