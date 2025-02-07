import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSixtyFourComponent } from './home-en-blog-sixty-four/home-en-blog-sixty-four.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSixtyFourComponent }];

@NgModule({
  declarations: [HomeEnBlogSixtyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyFourEnBlogModule {}
