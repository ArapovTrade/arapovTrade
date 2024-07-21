import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiveComponent } from './home-ru-blog-five/home-ru-blog-five.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiveComponent }];

@NgModule({
  declarations: [HomeRuBlogFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiveRuBlogModule {}
