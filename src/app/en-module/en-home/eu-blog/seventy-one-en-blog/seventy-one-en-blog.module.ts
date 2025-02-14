import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventyOneComponent } from './home-en-blog-seventy-one/home-en-blog-seventy-one.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSeventyOneComponent }];

@NgModule({
  declarations: [HomeEnBlogSeventyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyOneEnBlogModule {}
