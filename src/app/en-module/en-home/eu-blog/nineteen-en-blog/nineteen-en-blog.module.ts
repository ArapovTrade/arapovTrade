import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNineteenComponent } from './home-en-blog-nineteen/home-en-blog-nineteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNineteenComponent }];

@NgModule({
  declarations: [HomeEnBlogNineteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NineteenEnBlogModule {}
