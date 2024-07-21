import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSevenComponent } from './home-ru-blog-seven/home-ru-blog-seven.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSevenComponent }];

@NgModule({
  declarations: [HomeRuBlogSevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SevenRuBlogModule {}
