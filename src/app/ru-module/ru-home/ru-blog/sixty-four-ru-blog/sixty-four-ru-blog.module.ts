import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixtyFourComponent } from './home-ru-blog-sixty-four/home-ru-blog-sixty-four.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixtyFourComponent }];

@NgModule({
  declarations: [HomeRuBlogSixtyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyFourRuBlogModule {}
