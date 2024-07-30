import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogThirtyComponent } from './home-en-blog-thirty/home-en-blog-thirty.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogThirtyComponent }];

@NgModule({
  declarations: [HomeEnBlogThirtyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyEnBlogModule {}
