import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSixtyNineComponent } from './home-en-blog-sixty-nine/home-en-blog-sixty-nine.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSixtyNineComponent }];

@NgModule({
  declarations: [HomeEnBlogSixtyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyNineEnBlogModule {}
