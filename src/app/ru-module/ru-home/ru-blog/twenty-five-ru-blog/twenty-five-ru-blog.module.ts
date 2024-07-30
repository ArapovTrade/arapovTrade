import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwentyFiveComponent } from './home-ru-blog-twenty-five/home-ru-blog-twenty-five.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogTwentyFiveComponent }];

@NgModule({
  declarations: [HomeRuBlogTwentyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyFiveRuBlogModule {}
