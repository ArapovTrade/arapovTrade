import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventyThreeComponent } from './home-en-blog-seventy-three/home-en-blog-seventy-three.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogSeventyThreeComponent },
];

@NgModule({
  declarations: [HomeEnBlogSeventyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyThreeEnBlogModule {}
