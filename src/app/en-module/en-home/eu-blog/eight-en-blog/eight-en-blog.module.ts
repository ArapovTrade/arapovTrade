import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightComponent } from './home-en-blog-eight/home-en-blog-eight.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEightComponent }];

@NgModule({
  declarations: [HomeEnBlogEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightEnBlogModule {}
