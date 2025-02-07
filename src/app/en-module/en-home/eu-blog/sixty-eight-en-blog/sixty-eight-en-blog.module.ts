import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSixtyEightComponent } from './home-en-blog-sixty-eight/home-en-blog-sixty-eight.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSixtyEightComponent }];

@NgModule({
  declarations: [HomeEnBlogSixtyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyEightEnBlogModule {}
