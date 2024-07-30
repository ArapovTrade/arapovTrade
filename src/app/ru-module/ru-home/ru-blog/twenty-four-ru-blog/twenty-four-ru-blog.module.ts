import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwentyFourComponent } from './home-ru-blog-twenty-four/home-ru-blog-twenty-four.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogTwentyFourComponent }];

@NgModule({
  declarations: [HomeRuBlogTwentyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyFourRuBlogModule {}
