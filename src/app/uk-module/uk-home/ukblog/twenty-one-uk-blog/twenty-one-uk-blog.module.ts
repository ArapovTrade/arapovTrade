import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwentyOneComponent } from './home-uk-blog-twenty-one/home-uk-blog-twenty-one.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogTwentyOneComponent }];

@NgModule({
  declarations: [HomeUkBlogTwentyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyOneUkBlogModule {}
