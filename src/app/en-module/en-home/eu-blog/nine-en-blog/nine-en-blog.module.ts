import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNineComponent } from './home-en-blog-nine/home-en-blog-nine.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNineComponent }];

@NgModule({
  declarations: [HomeEnBlogNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NineEnBlogModule {}
