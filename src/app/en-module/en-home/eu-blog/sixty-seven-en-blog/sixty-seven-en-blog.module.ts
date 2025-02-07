import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSixtySevenComponent } from './home-en-blog-sixty-seven/home-en-blog-sixty-seven.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSixtySevenComponent }];

@NgModule({
  declarations: [HomeEnBlogSixtySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtySevenEnBlogModule {}
