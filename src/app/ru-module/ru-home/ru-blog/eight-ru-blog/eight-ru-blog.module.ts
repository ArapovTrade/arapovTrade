import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogEightComponent } from './home-ru-blog-eight/home-ru-blog-eight.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogEightComponent }];

@NgModule({
  declarations: [HomeRuBlogEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightRuBlogModule {}
