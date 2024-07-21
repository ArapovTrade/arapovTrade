import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFourComponent } from './home-en-blog-four/home-en-blog-four.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogFourComponent }];

@NgModule({
  declarations: [HomeEnBlogFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourEnBlogModule {}
