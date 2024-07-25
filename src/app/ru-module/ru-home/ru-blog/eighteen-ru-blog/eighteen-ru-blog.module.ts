import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogEighteenComponent } from './home-ru-blog-eighteen/home-ru-blog-eighteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogEighteenComponent }];

@NgModule({
  declarations: [HomeRuBlogEighteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EighteenRuBlogModule {}
