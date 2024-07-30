import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwentyNineComponent } from './home-uk-blog-twenty-nine/home-uk-blog-twenty-nine.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogTwentyNineComponent }];

@NgModule({
  declarations: [HomeUkBlogTwentyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyNineUkBlogModule {}
