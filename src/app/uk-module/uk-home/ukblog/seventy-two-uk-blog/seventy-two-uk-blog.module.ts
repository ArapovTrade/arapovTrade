import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventyTwoComponent } from './home-uk-blog-seventy-two/home-uk-blog-seventy-two.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSeventyTwoComponent }];

@NgModule({
  declarations: [HomeUkBlogSeventyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyTwoUkBlogModule {}
