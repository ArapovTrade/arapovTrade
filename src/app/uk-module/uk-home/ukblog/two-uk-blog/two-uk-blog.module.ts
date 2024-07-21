import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwoComponent } from './home-uk-blog-two/home-uk-blog-two.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogTwoComponent }];

@NgModule({
  declarations: [HomeUkBlogTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwoUkBlogModule {}
