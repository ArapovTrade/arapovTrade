import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwentyComponent } from './home-uk-blog-twenty/home-uk-blog-twenty.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogTwentyComponent }];

@NgModule({
  declarations: [HomeUkBlogTwentyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyUkBlogModule {}
