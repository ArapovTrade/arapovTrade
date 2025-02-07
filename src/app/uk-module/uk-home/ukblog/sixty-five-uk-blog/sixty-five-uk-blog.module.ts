import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSixtyFiveComponent } from './home-uk-blog-sixty-five/home-uk-blog-sixty-five.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSixtyFiveComponent }];

@NgModule({
  declarations: [HomeUkBlogSixtyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyFiveUkBlogModule {}
