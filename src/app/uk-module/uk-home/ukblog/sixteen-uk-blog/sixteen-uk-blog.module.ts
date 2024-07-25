import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSixteenComponent } from './home-uk-blog-sixteen/home-uk-blog-sixteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSixteenComponent }];

@NgModule({
  declarations: [HomeUkBlogSixteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixteenUkBlogModule {}
