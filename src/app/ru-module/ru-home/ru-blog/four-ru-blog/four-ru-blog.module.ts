import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourComponent } from './home-ru-blog-four/home-ru-blog-four.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFourComponent }];

@NgModule({
  declarations: [HomeRuBlogFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourRuBlogModule {}
