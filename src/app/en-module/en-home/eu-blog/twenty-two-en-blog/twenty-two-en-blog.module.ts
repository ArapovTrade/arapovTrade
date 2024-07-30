import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTwentyTwoComponent } from './home-en-blog-twenty-two/home-en-blog-twenty-two.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogTwentyTwoComponent }];

@NgModule({
  declarations: [HomeEnBlogTwentyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyTwoEnBlogModule {}
