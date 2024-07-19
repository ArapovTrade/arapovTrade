import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOneComponent } from './home-ru-blog-one/home-ru-blog-one.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOneComponent }];

@NgModule({
  declarations: [HomeRuBlogOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OneRuBlogModule {}
