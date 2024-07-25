import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirteenComponent } from './home-uk-blog-thirteen/home-uk-blog-thirteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogThirteenComponent }];

@NgModule({
  declarations: [HomeUkBlogThirteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirteenUkBlogModule {}
