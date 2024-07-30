import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTwentyOneComponent } from './home-en-blog-twenty-one/home-en-blog-twenty-one.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogTwentyOneComponent }];

@NgModule({
  declarations: [HomeEnBlogTwentyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyOneEnBlogModule {}
