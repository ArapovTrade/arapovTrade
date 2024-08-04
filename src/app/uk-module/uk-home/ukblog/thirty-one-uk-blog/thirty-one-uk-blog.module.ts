import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirtyOneComponent } from './home-uk-blog-thirty-one/home-uk-blog-thirty-one.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogThirtyOneComponent }];

@NgModule({
  declarations: [HomeUkBlogThirtyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyOneUkBlogModule {}
