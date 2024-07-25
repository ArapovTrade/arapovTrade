import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFourteenComponent } from './home-en-blog-fourteen/home-en-blog-fourteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogFourteenComponent }];

@NgModule({
  declarations: [HomeEnBlogFourteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourteenEnBlogModule {}
