import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSevenComponent } from './home-en-blog-seven/home-en-blog-seven.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSevenComponent }];

@NgModule({
  declarations: [HomeEnBlogSevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SevenEnBlogModule {}
