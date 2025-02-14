import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventyTwoComponent } from './home-en-blog-seventy-two/home-en-blog-seventy-two.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSeventyTwoComponent }];

@NgModule({
  declarations: [HomeEnBlogSeventyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyTwoEnBlogModule {}
