import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNineComponent } from './home-ru-blog-nine/home-ru-blog-nine.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNineComponent }];

@NgModule({
  declarations: [HomeRuBlogNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NineRuBlogModule {}
