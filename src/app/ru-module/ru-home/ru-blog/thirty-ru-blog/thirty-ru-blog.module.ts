import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThirtyComponent } from './home-ru-blog-thirty/home-ru-blog-thirty.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogThirtyComponent }];

@NgModule({
  declarations: [HomeRuBlogThirtyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyRuBlogModule {}
