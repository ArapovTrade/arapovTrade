import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightyThreeComponent } from './home-en-blog-eighty-three/home-en-blog-eighty-three.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogEightyThreeComponent },
];

@NgModule({
  declarations: [HomeEnBlogEightyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyThreeEnBlogModule {}
