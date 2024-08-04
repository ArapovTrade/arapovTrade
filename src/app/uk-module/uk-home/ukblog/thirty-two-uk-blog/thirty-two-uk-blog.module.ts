import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirtyTwoComponent } from './home-uk-blog-thirty-two/home-uk-blog-thirty-two.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogThirtyTwoComponent }];

@NgModule({
  declarations: [HomeUkBlogThirtyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyTwoUkBlogModule {}
