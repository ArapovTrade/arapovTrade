import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFiveComponent } from './home-en-blog-five/home-en-blog-five.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogFiveComponent }];

@NgModule({
  declarations: [HomeEnBlogFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiveEnBlogModule {}
