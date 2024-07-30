import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTwentyFourComponent } from './home-en-blog-twenty-four/home-en-blog-twenty-four.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogTwentyFourComponent }];

@NgModule({
  declarations: [HomeEnBlogTwentyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyFourEnBlogModule {}
