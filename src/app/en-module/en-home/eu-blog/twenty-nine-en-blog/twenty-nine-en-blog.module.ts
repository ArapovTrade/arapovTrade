import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTwentyNineComponent } from './home-en-blog-twenty-nine/home-en-blog-twenty-nine.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogTwentyNineComponent }];

@NgModule({
  declarations: [HomeEnBlogTwentyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyNineEnBlogModule {}
