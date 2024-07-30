import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTwentyFiveComponent } from './home-en-blog-twenty-five/home-en-blog-twenty-five.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogTwentyFiveComponent }];

@NgModule({
  declarations: [HomeEnBlogTwentyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyFiveEnBlogModule {}
