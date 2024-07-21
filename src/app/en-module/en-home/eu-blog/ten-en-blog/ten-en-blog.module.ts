import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTenComponent } from './home-en-blog-ten/home-en-blog-ten.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogTenComponent }];

@NgModule({
  declarations: [HomeEnBlogTenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TenEnBlogModule {}
