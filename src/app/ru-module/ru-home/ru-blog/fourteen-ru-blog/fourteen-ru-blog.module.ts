import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourteenComponent } from './home-ru-blog-fourteen/home-ru-blog-fourteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFourteenComponent }];

@NgModule({
  declarations: [HomeRuBlogFourteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourteenRuBlogModule {}
