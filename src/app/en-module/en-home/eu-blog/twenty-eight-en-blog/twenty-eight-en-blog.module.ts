import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTwentyEightComponent } from './home-en-blog-twenty-eight/home-en-blog-twenty-eight.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogTwentyEightComponent },
];

@NgModule({
  declarations: [HomeEnBlogTwentyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyEightEnBlogModule {}
