import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventyComponent } from './home-ru-blog-seventy/home-ru-blog-seventy.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSeventyComponent }];

@NgModule({
  declarations: [HomeRuBlogSeventyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyRuBlogModule {}
