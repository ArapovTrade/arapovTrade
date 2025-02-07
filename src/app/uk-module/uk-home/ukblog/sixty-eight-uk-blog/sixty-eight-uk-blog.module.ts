import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSixtyEightComponent } from './home-uk-blog-sixty-eight/home-uk-blog-sixty-eight.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSixtyEightComponent }];

@NgModule({
  declarations: [HomeUkBlogSixtyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyEightUkBlogModule {}
