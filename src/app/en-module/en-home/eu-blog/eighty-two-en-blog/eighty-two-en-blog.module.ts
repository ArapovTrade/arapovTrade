import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightyTwoComponent } from './home-en-blog-eighty-two/home-en-blog-eighty-two.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEightyTwoComponent }];

@NgModule({
  declarations: [HomeEnBlogEightyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyTwoEnBlogModule {}
