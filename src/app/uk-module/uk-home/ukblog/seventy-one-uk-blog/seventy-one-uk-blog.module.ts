import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventyOneComponent } from './home-uk-blog-seventy-one/home-uk-blog-seventy-one.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSeventyOneComponent }];

@NgModule({
  declarations: [HomeUkBlogSeventyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyOneUkBlogModule {}
