import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSixtyFiveComponent } from './home-en-blog-sixty-five/home-en-blog-sixty-five.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSixtyFiveComponent }];

@NgModule({
  declarations: [HomeEnBlogSixtyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyFiveEnBlogModule {}
