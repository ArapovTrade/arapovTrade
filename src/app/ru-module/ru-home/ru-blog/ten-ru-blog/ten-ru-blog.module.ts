import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTenComponent } from './home-ru-blog-ten/home-ru-blog-ten.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogTenComponent }];

@NgModule({
  declarations: [HomeRuBlogTenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TenRuBlogModule {}
